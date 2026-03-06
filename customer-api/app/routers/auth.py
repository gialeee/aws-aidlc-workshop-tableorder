from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_db
from app.schemas.requests import TableLoginRequest
from app.schemas.responses import SessionResponse
from app.services.auth_service import AuthService

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=SessionResponse)
async def table_login(request: TableLoginRequest, db: AsyncSession = Depends(get_db)):
    service = AuthService(db)
    result = await service.authenticate_table(request.store_code, request.table_number, request.password)
    return result
