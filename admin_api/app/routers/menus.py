from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from admin_api.app.dependencies import get_db, get_current_admin
from admin_api.app.schemas.requests import CreateMenuRequest, UpdateMenuRequest
from admin_api.app.schemas.responses import MenuResponse, MessageResponse
from admin_api.app.services.menu_service import MenuService

router = APIRouter(prefix="/api/admin/menus", tags=["menus"])


@router.get("", response_model=list[MenuResponse])
async def get_menus(admin: dict = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    service = MenuService(db)
    return await service.get_menus(admin["store_id"])


@router.post("", response_model=MenuResponse, status_code=201)
async def create_menu(request: CreateMenuRequest, admin: dict = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    service = MenuService(db)
    return await service.create_menu(admin["store_id"], request.model_dump())


@router.put("/{menu_id}", response_model=MenuResponse)
async def update_menu(menu_id: int, request: UpdateMenuRequest, admin: dict = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    service = MenuService(db)
    return await service.update_menu(menu_id, request.model_dump(exclude_unset=True))


@router.delete("/{menu_id}", response_model=MessageResponse)
async def delete_menu(menu_id: int, admin: dict = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    service = MenuService(db)
    await service.delete_menu(menu_id)
    return MessageResponse(message="Menu deleted")
