from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from shared.models import TableSession


class SessionRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def find_active_session(self, table_id: int) -> TableSession | None:
        result = await self.db.execute(
            select(TableSession).where(TableSession.table_id == table_id, TableSession.is_active.is_(True))
        )
        return result.scalar_one_or_none()

    async def find_by_id(self, session_id: UUID) -> TableSession | None:
        result = await self.db.execute(
            select(TableSession).where(TableSession.id == session_id)
        )
        return result.scalar_one_or_none()

    async def create_session(self, table_id: int) -> TableSession:
        session = TableSession(table_id=table_id)
        self.db.add(session)
        await self.db.flush()
        return session
