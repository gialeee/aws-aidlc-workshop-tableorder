from uuid import UUID

from fastapi import Depends, Header, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from shared.database import get_db_session
from shared.models import TableSession
from app.repositories.session_repository import SessionRepository


async def get_db(session: AsyncSession = Depends(get_db_session)):
    yield session


async def get_current_session(
    x_session_id: str = Header(...),
    db: AsyncSession = Depends(get_db_session),
) -> TableSession:
    try:
        session_id = UUID(x_session_id)
    except ValueError:
        raise HTTPException(status_code=401, detail="유효하지 않은 세션 ID입니다")

    repo = SessionRepository(db)
    session = await repo.find_by_id(session_id)
    if not session:
        raise HTTPException(status_code=401, detail="세션이 만료되었거나 유효하지 않습니다")
    return session
