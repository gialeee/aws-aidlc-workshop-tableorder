from datetime import datetime

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from admin_api.app.dependencies import get_db, get_current_admin
from admin_api.app.schemas.responses import OrderHistoryResponse, MessageResponse
from admin_api.app.services.table_service import TableService

router = APIRouter(prefix="/api/admin/tables", tags=["tables"])


@router.post("/{table_id}/session/end", response_model=MessageResponse)
async def end_table_session(table_id: int, admin: dict = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    service = TableService(db)
    await service.end_session(table_id)
    return MessageResponse(message="Session ended")


@router.get("/{table_id}/history", response_model=list[OrderHistoryResponse])
async def get_table_history(
    table_id: int,
    date_from: datetime | None = Query(None),
    date_to: datetime | None = Query(None),
    cursor: int | None = Query(None),
    admin: dict = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    service = TableService(db)
    return await service.get_history(table_id, date_from, date_to, cursor)
