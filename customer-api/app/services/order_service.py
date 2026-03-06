from datetime import datetime, UTC
from uuid import UUID

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from shared.models import Order, OrderItem, TableInfo
from app.repositories.order_repository import OrderRepository
from app.repositories.menu_repository import MenuRepository
from app.repositories.session_repository import SessionRepository
from app.schemas.requests import OrderItemInput


class OrderService:
    def __init__(self, db: AsyncSession):
        self.order_repo = OrderRepository(db)
        self.menu_repo = MenuRepository(db)
        self.session_repo = SessionRepository(db)
        self.db = db

    async def create_order(self, session_id: UUID, items: list[OrderItemInput]) -> Order:
        session = await self.session_repo.find_by_id(session_id)
        if not session:
            raise HTTPException(status_code=400, detail="유효하지 않은 세션입니다")

        table = await self.db.get(TableInfo, session.table_id)
        store_id = table.store_id

        order_items = []
        total = 0
        for item in items:
            menu = await self.menu_repo.find_by_id(item.menu_id)
            if not menu or not menu.is_available:
                raise HTTPException(status_code=400, detail=f"메뉴 ID {item.menu_id}을(를) 주문할 수 없습니다")
            subtotal = menu.price * item.quantity
            order_items.append(OrderItem(
                menu_id=menu.id,
                menu_name=menu.name,
                quantity=item.quantity,
                unit_price=menu.price,
                subtotal=subtotal,
            ))
            total += subtotal

        order_number = await self._generate_order_number(store_id)
        order = Order(
            store_id=store_id,
            table_id=session.table_id,
            session_id=session.id,
            order_number=order_number,
            status="PENDING",
            total_amount=total,
            items=order_items,
        )
        await self.order_repo.create(order)
        await self.db.commit()
        await self.db.refresh(order, ["items"])
        return order

    async def get_orders_by_session(self, session_id: UUID) -> list[Order]:
        return await self.order_repo.find_by_session(session_id)

    async def _generate_order_number(self, store_id: int) -> str:
        count = await self.order_repo.count_today_by_store(store_id)
        today = datetime.now(UTC).strftime("%Y%m%d")
        return f"ORD-{today}-{count + 1:04d}"
