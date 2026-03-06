from datetime import datetime

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from shared.models.order_history import OrderHistory
from admin_api.app.repositories.order_repository import OrderRepository
from admin_api.app.repositories.session_repository import SessionRepository
from admin_api.app.repositories.history_repository import HistoryRepository


class TableService:
    def __init__(self, db: AsyncSession):
        self.order_repo = OrderRepository(db)
        self.session_repo = SessionRepository(db)
        self.history_repo = HistoryRepository(db)

    async def end_session(self, table_id: int):
        session = await self.session_repo.find_active_by_table(table_id)
        if not session:
            raise HTTPException(status_code=404, detail="No active session for this table")

        orders = await self.order_repo.find_by_session(session.id)
        for order in orders:
            items_json = [
                {"menu_name": item.menu_name, "quantity": item.quantity, "unit_price": item.unit_price, "subtotal": item.subtotal}
                for item in order.items
            ]
            history = OrderHistory(
                original_order_id=order.id,
                store_id=order.store_id,
                table_id=order.table_id,
                session_id=order.session_id,
                order_number=order.order_number,
                status=order.status,
                total_amount=order.total_amount,
                items_json=items_json,
                ordered_at=order.created_at,
            )
            await self.history_repo.create(history)
            await self.order_repo.delete_order(order.id)

        await self.session_repo.end_session(session.id)

    async def get_history(self, table_id: int, date_from: datetime | None, date_to: datetime | None, cursor: int | None):
        return await self.history_repo.find_by_table(table_id, date_from, date_to, cursor)
