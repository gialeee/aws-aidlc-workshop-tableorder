from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from shared.database import get_db_session
from admin_api.app.services.auth_service import AuthService

security = HTTPBearer()


async def get_db() -> AsyncSession:
    async for session in get_db_session():
        yield session


async def get_current_admin(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    return AuthService.verify_token(credentials.credentials)
