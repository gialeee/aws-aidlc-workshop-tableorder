from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from shared.models.menu import Menu
from admin_api.app.repositories.menu_repository import MenuRepository


class MenuService:
    def __init__(self, db: AsyncSession):
        self.repo = MenuRepository(db)

    async def get_menus(self, store_id: int):
        return await self.repo.find_by_store(store_id)

    async def create_menu(self, store_id: int, data: dict):
        menu = Menu(store_id=store_id, **data)
        return await self.repo.create(menu)

    async def update_menu(self, menu_id: int, data: dict):
        menu = await self.repo.update(menu_id, data)
        if not menu:
            raise HTTPException(status_code=404, detail="Menu not found")
        return menu

    async def delete_menu(self, menu_id: int):
        if not await self.repo.delete(menu_id):
            raise HTTPException(status_code=404, detail="Menu not found")
