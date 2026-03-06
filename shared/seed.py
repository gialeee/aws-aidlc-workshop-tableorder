import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from shared.database import async_session_factory, engine, Base
from shared.models import Store, Admin, TableInfo, Category, Menu, TableSession
from shared.utils.password import hash_password


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session_factory() as db:
        # 매장
        store = Store(store_id="STORE001", name="맛있는 식당")
        db.add(store)
        await db.flush()

        # 관리자
        db.add(Admin(store_id=store.id, username="admin", password_hash=hash_password("admin123")))

        # 테이블 (1~5번)
        for i in range(1, 6):
            db.add(TableInfo(store_id=store.id, table_number=i, password_hash=hash_password("1234")))

        # 카테고리
        cat1 = Category(store_id=store.id, name="메인", sort_order=1)
        cat2 = Category(store_id=store.id, name="사이드", sort_order=2)
        cat3 = Category(store_id=store.id, name="음료", sort_order=3)
        db.add_all([cat1, cat2, cat3])
        await db.flush()

        # 메뉴
        menus = [
            Menu(store_id=store.id, category_id=cat1.id, name="불고기", price=15000, description="달콤한 양념 불고기", sort_order=1),
            Menu(store_id=store.id, category_id=cat1.id, name="김치찌개", price=9000, description="돼지고기 김치찌개", sort_order=2),
            Menu(store_id=store.id, category_id=cat1.id, name="된장찌개", price=8000, description="구수한 된장찌개", sort_order=3),
            Menu(store_id=store.id, category_id=cat1.id, name="비빔밥", price=10000, description="야채 듬뿍 비빔밥", sort_order=4),
            Menu(store_id=store.id, category_id=cat2.id, name="계란말이", price=7000, description="부드러운 계란말이", sort_order=1),
            Menu(store_id=store.id, category_id=cat2.id, name="김치전", price=8000, description="바삭한 김치전", sort_order=2),
            Menu(store_id=store.id, category_id=cat2.id, name="떡볶이", price=6000, description="매콤 떡볶이", sort_order=3),
            Menu(store_id=store.id, category_id=cat3.id, name="콜라", price=2000, description="시원한 콜라", sort_order=1),
            Menu(store_id=store.id, category_id=cat3.id, name="사이다", price=2000, description="청량 사이다", sort_order=2),
            Menu(store_id=store.id, category_id=cat3.id, name="맥주", price=5000, description="시원한 생맥주", sort_order=3),
        ]
        db.add_all(menus)
        await db.commit()

    print("Seed 완료!")
    print("매장: STORE001 (맛있는 식당)")
    print("테이블: 1~5번 (비밀번호: 1234)")
    print("관리자: admin / admin123")
    print("메뉴: 10개 (메인4, 사이드3, 음료3)")


if __name__ == "__main__":
    asyncio.run(seed())
