import asyncio
import json
from datetime import datetime, timezone
from typing import AsyncGenerator

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from admin_api.app.repositories.order_repository import OrderRepository

VALID_TRANSITIONS = {
    "PENDING": "PREPARING",
    "PREPARING": "COMPLETED",
}


class OrderService:
    def __init__(self, db: AsyncSession):
        self.repo = OrderRepository(db)

    async def get_orders_by_store(self, store_id: int):
        return await self.repo.find_by_store(store_id)

    async def update_status(self, order_id: int, new_status: str):
        order = await self.repo.find_by_id(order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")

        expected = VALID_TRANSITIONS.get(order.status)
        if expected != new_status:
            raise HTTPException(status_code=400, detail=f"Cannot transition from {order.status} to {new_status}")

        return await self.repo.update_status(order_id, new_status)

    async def delete_order(self, order_id: int):
        if not await self.repo.delete_order(order_id):
            raise HTTPException(status_code=404, detail="Order not found")

    async def stream_orders(self, store_id: int) -> AsyncGenerator[str, None]:
        last_checked = datetime.now(timezone.utc)
        while True:
            await asyncio.sleep(3)
            new_orders = await self.repo.find_new_since(store_id, last_checked)
            last_checked = datetime.now(timezone.utc)
            for order in new_orders:
                data = {
                    "order_id": order.id,
                    "table_id": order.table_id,
                    "order_number": order.order_number,
                    "status": order.status,
                    "total_amount": order.total_amount,
                    "items": [
                        {"menu_name": item.menu_name, "quantity": item.quantity, "unit_price": item.unit_price}
                        for item in order.items
                    ],
                }
                yield json.dumps({"event": "new_order", "data": data})
