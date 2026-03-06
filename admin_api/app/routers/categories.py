from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from admin_api.app.dependencies import get_db, get_current_admin
from admin_api.app.schemas.requests import CreateCategoryRequest, UpdateCategoryRequest
from admin_api.app.schemas.responses import CategoryResponse, MessageResponse
from admin_api.app.services.category_service import CategoryService

router = APIRouter(prefix="/api/admin/categories", tags=["categories"])


@router.get("", response_model=list[CategoryResponse])
async def get_categories(admin: dict = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    service = CategoryService(db)
    return await service.get_categories(admin["store_id"])


@router.post("", response_model=CategoryResponse, status_code=201)
async def create_category(request: CreateCategoryRequest, admin: dict = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    service = CategoryService(db)
    return await service.create_category(admin["store_id"], request.name, request.sort_order)


@router.put("/{category_id}", response_model=CategoryResponse)
async def update_category(category_id: int, request: UpdateCategoryRequest, admin: dict = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    service = CategoryService(db)
    return await service.update_category(category_id, request.model_dump(exclude_unset=True))


@router.delete("/{category_id}", response_model=MessageResponse)
async def delete_category(category_id: int, admin: dict = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    service = CategoryService(db)
    await service.delete_category(category_id)
    return MessageResponse(message="Category deleted")
