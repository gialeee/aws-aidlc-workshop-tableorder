"""초기 데이터 seed 스크립트 (통합)"""
import asyncio
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from shared.config import settings
from shared.utils.password import hash_password

engine = create_async_engine(settings.DATABASE_URL)
SessionLocal = async_sessionmaker(engine, class_=AsyncSession)

MENUS = [
    # (category_id, name, price, description, image_url)
    (1, '불고기', 15000, '달콤한 양념 불고기', 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop'),
    (1, '김치찌개', 9000, '돼지고기 김치찌개', 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop'),
    (1, '된장찌개', 8000, '구수한 된장찌개', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop'),
    (1, '비빔밥', 10000, '야채 듬뿍 비빔밥', 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400&h=300&fit=crop'),
    (1, '제육볶음', 11000, '매콤한 제육볶음 정식', 'https://images.unsplash.com/photo-1674928683311-e5039260babc?w=400&h=300&fit=crop'),
    (1, '삼겹살', 15000, '국내산 삼겹살 200g', 'https://images.unsplash.com/photo-1632558610168-5765df1d4f53?w=400&h=300&fit=crop'),
    (1, '잡채', 9000, '당면 잡채', 'https://images.unsplash.com/photo-1648148249898-75a949a2c0e2?w=400&h=300&fit=crop'),
    (2, '떡볶이', 6000, '매콤 떡볶이', 'https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=400&h=300&fit=crop'),
    (2, '계란말이', 5000, '치즈 계란말이', 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop'),
    (2, '김치전', 7000, '바삭한 김치전', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop'),
    (2, '감자튀김', 6000, '바삭한 감자튀김', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop'),
    (2, '어묵탕', 7000, '따뜻한 어묵탕', 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop'),
    (3, '콜라', 2000, '시원한 콜라', 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop'),
    (3, '사이다', 2000, '청량 사이다', 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&h=300&fit=crop'),
    (3, '맥주', 5000, '시원한 생맥주', 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=300&fit=crop'),
    (3, '오렌지주스', 3000, '생과일 오렌지주스', 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop'),
    (3, '아메리카노', 3500, '아이스 아메리카노', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop'),
    (3, '소주', 5000, '참이슬', 'https://images.unsplash.com/photo-1574740493233-1c4e8b076899?w=400&h=300&fit=crop'),
]


async def seed():
    async with SessionLocal() as db:
        # Store
        await db.execute(text(
            "INSERT INTO stores (store_id, name, created_at) VALUES ('store-001', '맛있는 식당', now()) ON CONFLICT DO NOTHING"
        ))
        # Admin
        pw = hash_password("admin123")
        await db.execute(text(
            "INSERT INTO admins (store_id, username, password_hash, created_at) VALUES (1, 'admin', :pw, now()) ON CONFLICT DO NOTHING"
        ), {"pw": pw})
        # Categories
        for i, name in enumerate(["메인", "사이드", "음료"], 1):
            await db.execute(text(
                "INSERT INTO categories (store_id, name, sort_order) VALUES (1, :name, :order) ON CONFLICT DO NOTHING"
            ), {"name": name, "order": i})
        # Tables
        table_pw = hash_password("1234")
        for num in range(1, 6):
            await db.execute(text(
                "INSERT INTO tables (store_id, table_number, password_hash, created_at) VALUES (1, :num, :pw, now()) ON CONFLICT DO NOTHING"
            ), {"num": num, "pw": table_pw})
        # Menus
        for cid, name, price, desc, img in MENUS:
            await db.execute(text(
                "INSERT INTO menus (store_id, category_id, name, price, description, image_url, is_available, sort_order, created_at, updated_at) "
                "VALUES (1, :cid, :name, :price, :desc, :img, true, 0, now(), now()) ON CONFLICT DO NOTHING"
            ), {"cid": cid, "name": name, "price": price, "desc": desc, "img": img})

        await db.commit()
        print("✅ Seed 완료!")
        print("   매장: store-001 (맛있는 식당)")
        print("   관리자: admin / admin123")
        print("   테이블: 1~5번 (비밀번호: 1234)")
        print(f"   메뉴: {len(MENUS)}개 (메인7, 사이드5, 음료6)")


if __name__ == "__main__":
    asyncio.run(seed())
