from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from shared.utils.password import verify_password
from app.repositories.store_repository import StoreRepository
from app.repositories.table_repository import TableRepository
from app.repositories.session_repository import SessionRepository


class AuthService:
    def __init__(self, db: AsyncSession):
        self.store_repo = StoreRepository(db)
        self.table_repo = TableRepository(db)
        self.session_repo = SessionRepository(db)
        self.db = db

    async def authenticate_table(self, store_code: str, table_number: int, password: str):
        store = await self.store_repo.find_by_store_code(store_code)
        if not store:
            raise HTTPException(status_code=404, detail="매장을 찾을 수 없습니다")

        table = await self.table_repo.find_by_store_and_number(store.id, table_number)
        if not table:
            raise HTTPException(status_code=404, detail="테이블을 찾을 수 없습니다")

        if not verify_password(password, table.password_hash):
            raise HTTPException(status_code=401, detail="비밀번호가 올바르지 않습니다")

        session = await self.session_repo.find_active_session(table.id)
        if not session:
            session = await self.session_repo.create_session(table.id)
            await self.db.commit()

        return {
            "session_id": session.id,
            "store_id": store.id,
            "table_id": table.id,
            "table_number": table.table_number,
        }
