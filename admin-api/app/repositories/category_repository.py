from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from shared.models.category import Category


class CategoryRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def find_by_store(self, store_id: int) -> list[Category]:
        result = await self.db.execute(
            select(Category).where(Category.store_id == store_id).order_by(Category.sort_order, Category.id)
        )
        return list(result.scalars().all())

    async def find_by_id(self, category_id: int) -> Category | None:
        result = await self.db.execute(select(Category).where(Category.id == category_id))
        return result.scalar_one_or_none()

    async def create(self, category: Category) -> Category:
        self.db.add(category)
        await self.db.flush()
        await self.db.refresh(category)
        return category

    async def update(self, category_id: int, data: dict) -> Category | None:
        category = await self.find_by_id(category_id)
        if not category:
            return None
        for key, value in data.items():
            if value is not None:
                setattr(category, key, value)
        await self.db.flush()
        await self.db.refresh(category)
        return category

    async def delete(self, category_id: int) -> bool:
        category = await self.find_by_id(category_id)
        if not category:
            return False
        await self.db.delete(category)
        await self.db.flush()
        return True
