from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from shared.models import TableSession, TableInfo
from app.dependencies import get_db, get_current_session
from app.schemas.responses import CategoryResponse, MenuResponse
from app.services.menu_service import MenuService

router = APIRouter(prefix="/api", tags=["menus"])


@router.get("/categories", response_model=list[CategoryResponse])
async def get_categories(
    session: TableSession = Depends(get_current_session),
    db: AsyncSession = Depends(get_db),
):
    service = MenuService(db)
    table = await db.get(TableInfo, session.table_id)
    return await service.get_categories(table.store_id)


@router.get("/menus", response_model=list[MenuResponse])
async def get_menus(
    category_id: int | None = Query(None),
    session: TableSession = Depends(get_current_session),
    db: AsyncSession = Depends(get_db),
):
    service = MenuService(db)
    table = await db.get(TableInfo, session.table_id)
    return await service.get_menus(table.store_id, category_id)
