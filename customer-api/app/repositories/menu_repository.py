from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from shared.models import Category, Menu


class MenuRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def find_categories(self, store_id: int) -> list[Category]:
        result = await self.db.execute(
            select(Category).where(Category.store_id == store_id).order_by(Category.sort_order, Category.id)
        )
        return list(result.scalars().all())

    async def find_menus(self, store_id: int, category_id: int | None = None) -> list[Menu]:
        query = select(Menu).where(Menu.store_id == store_id, Menu.is_available.is_(True))
        if category_id:
            query = query.where(Menu.category_id == category_id)
        query = query.order_by(Menu.sort_order, Menu.id)
        result = await self.db.execute(query)
        return list(result.scalars().all())

    async def find_by_id(self, menu_id: int) -> Menu | None:
        result = await self.db.execute(select(Menu).where(Menu.id == menu_id))
        return result.scalar_one_or_none()
