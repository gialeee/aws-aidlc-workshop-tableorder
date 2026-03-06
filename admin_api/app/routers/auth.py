from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from admin_api.app.dependencies import get_db
from admin_api.app.schemas.requests import AdminLoginRequest
from admin_api.app.schemas.responses import AdminLoginResponse
from admin_api.app.services.auth_service import AuthService

router = APIRouter(prefix="/api/admin", tags=["auth"])


@router.post("/login", response_model=AdminLoginResponse)
async def admin_login(request: AdminLoginRequest, db: AsyncSession = Depends(get_db)):
    service = AuthService(db)
    return await service.authenticate(request.store_id, request.username, request.password)
