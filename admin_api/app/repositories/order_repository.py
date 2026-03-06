from datetime import datetime

from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from shared.models.order import Order, OrderItem


class OrderRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def find_by_store(self, store_id: int) -> list[Order]:
        result = await self.db.execute(
            select(Order)
            .options(selectinload(Order.items), selectinload(Order.session))
            .where(Order.store_id == store_id)
            .order_by(Order.created_at.desc())
        )
        return list(result.scalars().all())

    async def find_by_id(self, order_id: int) -> Order | None:
        result = await self.db.execute(
            select(Order).options(selectinload(Order.items)).where(Order.id == order_id)
        )
        return result.scalar_one_or_none()

    async def find_by_session(self, session_id) -> list[Order]:
        result = await self.db.execute(
            select(Order)
            .options(selectinload(Order.items))
            .where(Order.session_id == session_id)
            .order_by(Order.created_at.asc())
        )
        return list(result.scalars().all())

    async def update_status(self, order_id: int, status: str) -> Order | None:
        order = await self.find_by_id(order_id)
        if order:
            order.status = status
            await self.db.flush()
        return order

    async def delete_order(self, order_id: int) -> bool:
        order = await self.find_by_id(order_id)
        if not order:
            return False
        await self.db.delete(order)
        await self.db.flush()
        return True

    async def find_new_since(self, store_id: int, since: datetime) -> list[Order]:
        result = await self.db.execute(
            select(Order)
            .options(selectinload(Order.items))
            .where(Order.store_id == store_id, Order.created_at > since)
            .order_by(Order.created_at.desc())
        )
        return list(result.scalars().all())
