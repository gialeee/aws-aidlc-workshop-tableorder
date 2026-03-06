from sqlalchemy.ext.asyncio import AsyncSession

from shared.models import Category, Menu
from app.repositories.menu_repository import MenuRepository


class MenuService:
    def __init__(self, db: AsyncSession):
        self.menu_repo = MenuRepository(db)

    async def get_categories(self, store_id: int) -> list[Category]:
        return await self.menu_repo.find_categories(store_id)

    async def get_menus(self, store_id: int, category_id: int | None = None) -> list[Menu]:
        return await self.menu_repo.find_menus(store_id, category_id)
