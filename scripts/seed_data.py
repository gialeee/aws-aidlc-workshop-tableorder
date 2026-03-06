"""Seed data for development/testing."""
import asyncio

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker

from shared.config import settings
from shared.utils.password import hash_password

engine = create_async_engine(settings.DATABASE_URL)
SessionLocal = async_sessionmaker(engine, class_=AsyncSession)


async def seed():
    async with SessionLocal() as db:
        # Store
        await db.execute(text(
            "INSERT INTO stores (store_id, name, created_at) VALUES ('store-001', '맛있는 식당', now()) ON CONFLICT DO NOTHING"
        ))

        # Admin (username: admin, password: admin123)
        pw = hash_password("admin123")
        await db.execute(text(
            "INSERT INTO admins (store_id, username, password_hash, created_at) VALUES (1, 'admin', :pw, now()) ON CONFLICT DO NOTHING"
        ), {"pw": pw})

        # Categories
        for i, name in enumerate(["메인", "사이드", "음료"], 1):
            await db.execute(text(
                "INSERT INTO categories (store_id, name, sort_order) VALUES (1, :name, :order) ON CONFLICT DO NOTHING"
            ), {"name": name, "order": i})

        # Tables (password: 1234)
        table_pw = hash_password("1234")
        for num in range(1, 6):
            await db.execute(text(
                "INSERT INTO tables (store_id, table_number, password_hash, created_at) VALUES (1, :num, :pw, now()) ON CONFLICT DO NOTHING"
            ), {"num": num, "pw": table_pw})

        # Menus
        menus = [
            (1, 1, "김치찌개", 9000, "돼지고기 김치찌개"),
            (1, 1, "된장찌개", 8000, "두부 된장찌개"),
            (1, 1, "불고기", 13000, "소불고기 정식"),
            (1, 2, "계란말이", 5000, "치즈 계란말이"),
            (1, 2, "김치전", 7000, "바삭한 김치전"),
            (1, 3, "콜라", 2000, None),
            (1, 3, "사이다", 2000, None),
            (1, 3, "맥주", 5000, "생맥주 500ml"),
        ]
        for store_id, cat_id, name, price, desc in menus:
            await db.execute(text(
                "INSERT INTO menus (store_id, category_id, name, price, description, is_available, sort_order, created_at, updated_at) "
                "VALUES (:sid, :cid, :name, :price, :desc, true, 0, now(), now()) ON CONFLICT DO NOTHING"
            ), {"sid": store_id, "cid": cat_id, "name": name, "price": price, "desc": desc})

        await db.commit()
        print("✅ Seed data inserted!")
        print("   Admin login: store_id=1, username=admin, password=admin123")
        print("   Tables: 1~5 (password: 1234)")


if __name__ == "__main__":
    asyncio.run(seed())
