from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from shared.models import TableInfo


class TableRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def find_by_store_and_number(self, store_id: int, table_number: int) -> TableInfo | None:
        result = await self.db.execute(
            select(TableInfo).where(TableInfo.store_id == store_id, TableInfo.table_number == table_number)
        )
        return result.scalar_one_or_none()
