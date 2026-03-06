from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from shared.models import Store


class StoreRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def find_by_store_code(self, store_code: str) -> Store | None:
        result = await self.db.execute(select(Store).where(Store.store_id == store_code))
        return result.scalar_one_or_none()
