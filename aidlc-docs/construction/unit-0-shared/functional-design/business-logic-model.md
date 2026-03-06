# Business Logic Model - Unit 0: Shared

## Overview
Unit 0은 데이터 모델과 공통 유틸리티를 제공하는 기반 유닛입니다. 비즈니스 로직 자체는 Unit 1 (Customer)과 Unit 2 (Admin)에서 구현되지만, 데이터 무결성과 공통 규칙은 이 유닛에서 정의됩니다.

---

## Database Constraints (데이터 무결성)

### Unique Constraints
- Store: store_id 유일
- Admin: (store_id, username) 조합 유일
- TableInfo: (store_id, table_number) 조합 유일
- Order: order_number 유일

### Foreign Key Constraints
- Admin.store_id → Store.id
- TableInfo.store_id → Store.id
- TableSession.table_id → TableInfo.id
- Category.store_id → Store.id
- Menu.store_id → Store.id
- Menu.category_id → Category.id
- Order.store_id → Store.id
- Order.table_id → TableInfo.id
- Order.session_id → TableSession.id
- OrderItem.order_id → Order.id (CASCADE DELETE)
- OrderItem.menu_id → Menu.id

### Check Constraints
- Menu.price > 0
- OrderItem.quantity > 0
- OrderItem.unit_price > 0

---

## Common Utilities

### Password Utility
```
hash_password(plain_text: str) -> str
  - bcrypt 해싱 (work factor: 12)
  - 반환: 해싱된 문자열

verify_password(plain_text: str, hashed: str) -> bool
  - bcrypt 검증
  - 반환: 일치 여부
```

### Config Utility
```
Settings:
  - DATABASE_URL: PostgreSQL 연결 문자열
  - JWT_SECRET_KEY: JWT 서명 키
  - JWT_EXPIRATION_HOURS: 16
  - BCRYPT_ROUNDS: 12
```

### Database Connection
```
get_db_session() -> AsyncSession
  - SQLAlchemy async session factory
  - Connection pooling 사용
```
