from datetime import datetime, timedelta, timezone

import jwt
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from shared.config import settings
from shared.utils.password import verify_password
from admin_api.app.repositories.admin_repository import AdminRepository


class AuthService:
    def __init__(self, db: AsyncSession):
        self.repo = AdminRepository(db)

    async def authenticate(self, store_id: int, username: str, password: str) -> dict:
        admin = await self.repo.find_by_store_and_username(store_id, username)
        if not admin or not verify_password(password, admin.password_hash):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        payload = {
            "store_id": admin.store_id,
            "admin_id": admin.id,
            "username": admin.username,
            "exp": datetime.now(timezone.utc) + timedelta(hours=settings.JWT_EXPIRATION_HOURS),
        }
        token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm="HS256")
        return {"token": token, "admin_id": admin.id, "username": admin.username, "store_id": admin.store_id}

    @staticmethod
    def verify_token(token: str) -> dict:
        try:
            return jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")
