# Code Summary - Unit 0: Shared

## Generated Files

### Configuration
- `shared/config.py` - pydantic-settings 기반 설정 관리
- `.env` - 환경 변수 파일

### Database
- `shared/database.py` - AsyncEngine, session factory, Base 클래스

### Models (9개)
- `shared/models/store.py` - Store
- `shared/models/admin.py` - Admin
- `shared/models/table.py` - TableInfo
- `shared/models/table_session.py` - TableSession
- `shared/models/category.py` - Category
- `shared/models/menu.py` - Menu
- `shared/models/order.py` - Order, OrderItem
- `shared/models/order_history.py` - OrderHistory

### Utilities
- `shared/utils/password.py` - bcrypt hash/verify
- `shared/utils/logging.py` - RotatingFileHandler 로깅

### Alembic
- `shared/alembic.ini` - Alembic 설정
- `shared/alembic/env.py` - async 마이그레이션 환경
- `shared/alembic/script.py.mako` - 마이그레이션 템플릿

### Infrastructure
- `docker-compose.yml` - PostgreSQL 서비스

### Tests
- `shared/tests/test_password.py` - password utility 테스트
- `shared/tests/test_models.py` - 모델 import 및 tablename 테스트

## File Count
- Application code: 17 files
- Test code: 2 files
- Config: 3 files
- Total: 22 files
