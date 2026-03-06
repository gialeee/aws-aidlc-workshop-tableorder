from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from shared.models.menu import Menu


class MenuRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def find_by_store(self, store_id: int) -> list[Menu]:
        result = await self.db.execute(
            select(Menu).where(Menu.store_id == store_id).order_by(Menu.sort_order, Menu.id)
        )
        return list(result.scalars().all())

    async def find_by_id(self, menu_id: int) -> Menu | None:
        result = await self.db.execute(select(Menu).where(Menu.id == menu_id))
        return result.scalar_one_or_none()

    async def create(self, menu: Menu) -> Menu:
        self.db.add(menu)
        await self.db.flush()
        await self.db.refresh(menu)
        return menu

    async def update(self, menu_id: int, data: dict) -> Menu | None:
        menu = await self.find_by_id(menu_id)
        if not menu:
            return None
        for key, value in data.items():
            if value is not None:
                setattr(menu, key, value)
        await self.db.flush()
        await self.db.refresh(menu)
        return menu

    async def delete(self, menu_id: int) -> bool:
        menu = await self.find_by_id(menu_id)
        if not menu:
            return False
        await self.db.delete(menu)
        await self.db.flush()
        return True

    async def count_by_category(self, category_id: int) -> int:
        result = await self.db.execute(select(Menu).where(Menu.category_id == category_id))
        return len(result.scalars().all())
