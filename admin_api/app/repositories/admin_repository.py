from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from shared.models.admin import Admin


class AdminRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def find_by_store_and_username(self, store_id: int, username: str) -> Admin | None:
        result = await self.db.execute(
            select(Admin).where(Admin.store_id == store_id, Admin.username == username)
        )
        return result.scalar_one_or_none()
