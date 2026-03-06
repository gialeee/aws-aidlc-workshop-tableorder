from datetime import datetime, timezone

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from shared.models.table_session import TableSession


class SessionRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def find_active_by_table(self, table_id: int) -> TableSession | None:
        result = await self.db.execute(
            select(TableSession).where(TableSession.table_id == table_id, TableSession.is_active == True)
        )
        return result.scalar_one_or_none()

    async def end_session(self, session_id) -> None:
        await self.db.execute(
            update(TableSession)
            .where(TableSession.id == session_id)
            .values(is_active=False, ended_at=datetime.now(timezone.utc))
        )
        await self.db.flush()
