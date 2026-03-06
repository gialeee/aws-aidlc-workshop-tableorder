from datetime import datetime, timedelta

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from shared.models.order_history import OrderHistory


class HistoryRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, history: OrderHistory) -> OrderHistory:
        self.db.add(history)
        await self.db.flush()
        return history

    async def find_by_table(
        self, table_id: int, date_from: datetime | None, date_to: datetime | None, cursor: int | None, limit: int = 20
    ) -> list[OrderHistory]:
        query = select(OrderHistory).where(OrderHistory.table_id == table_id)

        one_year_ago = datetime.utcnow() - timedelta(days=365)
        query = query.where(OrderHistory.archived_at >= one_year_ago)

        if date_from:
            query = query.where(OrderHistory.ordered_at >= date_from)
        if date_to:
            query = query.where(OrderHistory.ordered_at <= date_to)
        if cursor:
            query = query.where(OrderHistory.id < cursor)

        query = query.order_by(OrderHistory.archived_at.desc(), OrderHistory.id.desc()).limit(limit)
        result = await self.db.execute(query)
        return list(result.scalars().all())
