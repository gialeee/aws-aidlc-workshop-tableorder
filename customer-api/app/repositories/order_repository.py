from datetime import datetime, UTC
from uuid import UUID

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from shared.models import Order


class OrderRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, order: Order) -> Order:
        self.db.add(order)
        await self.db.flush()
        return order

    async def find_by_session(self, session_id: UUID) -> list[Order]:
        result = await self.db.execute(
            select(Order)
            .options(selectinload(Order.items))
            .where(Order.session_id == session_id)
            .order_by(Order.created_at.desc())
        )
        return list(result.scalars().all())

    async def count_today_by_store(self, store_id: int) -> int:
        today_prefix = f"ORD-{datetime.now(UTC).strftime('%Y%m%d')}-"
        result = await self.db.execute(
            select(func.count(Order.id)).where(
                Order.store_id == store_id,
                Order.order_number.like(f"{today_prefix}%"),
            )
        )
        return result.scalar_one() or 0
