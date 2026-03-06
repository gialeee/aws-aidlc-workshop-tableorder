from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from shared.models.category import Category
from admin_api.app.repositories.category_repository import CategoryRepository
from admin_api.app.repositories.menu_repository import MenuRepository


class CategoryService:
    def __init__(self, db: AsyncSession):
        self.repo = CategoryRepository(db)
        self.menu_repo = MenuRepository(db)

    async def get_categories(self, store_id: int):
        return await self.repo.find_by_store(store_id)

    async def create_category(self, store_id: int, name: str, sort_order: int = 0):
        category = Category(store_id=store_id, name=name, sort_order=sort_order)
        return await self.repo.create(category)

    async def update_category(self, category_id: int, data: dict):
        category = await self.repo.update(category_id, data)
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")
        return category

    async def delete_category(self, category_id: int):
        count = await self.menu_repo.count_by_category(category_id)
        if count > 0:
            raise HTTPException(status_code=400, detail="Cannot delete category with existing menus")
        if not await self.repo.delete(category_id):
            raise HTTPException(status_code=404, detail="Category not found")
