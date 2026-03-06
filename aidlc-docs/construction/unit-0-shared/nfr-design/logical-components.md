# Logical Components - Unit 0: Shared

## Component Diagram

```
+-------------------------------------------------------+
|                    Shared Package                      |
|                                                        |
|  +--------------------------------------------------+  |
|  |  Models Layer                                    |  |
|  |  - Store, Admin, TableInfo, TableSession         |  |
|  |  - Category, Menu                                |  |
|  |  - Order, OrderItem, OrderHistory                |  |
|  +--------------------------------------------------+  |
|                                                        |
|  +--------------------------------------------------+  |
|  |  Database Layer                                  |  |
|  |  - AsyncEngine (connection pool)                 |  |
|  |  - AsyncSessionFactory                           |  |
|  |  - get_db_session() dependency                   |  |
|  +--------------------------------------------------+  |
|                                                        |
|  +--------------------------------------------------+  |
|  |  Utils Layer                                     |  |
|  |  - PasswordUtil (hash, verify)                   |  |
|  |  - Settings (pydantic-settings)                  |  |
|  |  - Logger (file-based rotating)                  |  |
|  +--------------------------------------------------+  |
|                                                        |
|  +--------------------------------------------------+  |
|  |  Migration Layer                                 |  |
|  |  - Alembic config                                |  |
|  |  - Migration versions                            |  |
|  +--------------------------------------------------+  |
|                                                        |
+-------------------------------------------------------+
```

---

## Component Details

### Models Layer
- **역할**: SQLAlchemy ORM 모델 정의
- **소비자**: Customer API, Admin API
- **import 방식**: `from shared.models import Store, Menu, Order, ...`

### Database Layer
- **역할**: DB 연결 관리, 세션 팩토리
- **소비자**: Customer API, Admin API
- **핵심**: AsyncEngine + connection pool + session factory

### Utils Layer
- **역할**: 공통 유틸리티 함수
- **소비자**: Customer API, Admin API
- **구성요소**:
  - PasswordUtil: bcrypt 해싱/검증
  - Settings: 환경 설정 로드 및 검증
  - Logger: 파일 기반 로깅 설정

### Migration Layer
- **역할**: DB 스키마 버전 관리
- **실행**: Admin API 배포 시 또는 수동 실행
- **도구**: Alembic

---

## Infrastructure Components

### PostgreSQL
- **역할**: 영구 데이터 저장소
- **포트**: 5432
- **Docker**: postgres:16 이미지
- **볼륨**: 데이터 영속성을 위한 Docker volume

### Docker Network
- **역할**: 서비스 간 통신 격리
- **구성**: 단일 bridge network
- **접근 제어**: DB는 API 서버에서만 접근 가능
