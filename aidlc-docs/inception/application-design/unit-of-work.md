# Unit of Work Definitions

## Implementation Strategy
**DB 전체 먼저 구축 → 유닛별 Full-stack 진행**

구현 순서:
1. Unit 0: Shared (DB 모델 + 공통 패키지)
2. Unit 1: Customer (Customer API + Customer Web)
3. Unit 2: Admin (Admin API + Admin Web)

---

## Unit 0: Shared

### Purpose
공유 데이터베이스 모델, 스키마, 유틸리티 패키지

### Responsibilities
- SQLAlchemy 데이터 모델 정의 (9개 엔티티)
- Alembic 마이그레이션 설정 및 초기 스키마 생성
- 공통 유틸리티 (bcrypt 해싱, 설정 관리)
- Docker Compose 기본 설정 (PostgreSQL)

### Technology
- Python, SQLAlchemy, Alembic, bcrypt

### Directory Structure
```
shared/
  models/
    __init__.py
    store.py
    admin.py
    table.py
    table_session.py
    category.py
    menu.py
    order.py
    order_item.py
    order_history.py
  utils/
    __init__.py
    password.py
    config.py
  database.py
  alembic/
    env.py
    versions/
  alembic.ini
  requirements.txt
```

---

## Unit 1: Customer

### Purpose
고객용 주문 시스템 (API + Web)

### Responsibilities
- 테이블 인증 및 자동 로그인
- 메뉴 조회
- 장바구니 관리
- 주문 생성
- 주문 내역 조회 (현재 세션)

### Technology
- Backend: Python FastAPI, SQLAlchemy (shared 모델 import)
- Frontend: React, Zustand, ESLint + Prettier

### Directory Structure
```
customer-api/
  app/
    __init__.py
    main.py
    routers/
      auth.py
      menus.py
      orders.py
    services/
      auth_service.py
      menu_service.py
      order_service.py
    repositories/
      table_repository.py
      session_repository.py
      menu_repository.py
      order_repository.py
    schemas/
      requests.py
      responses.py
    dependencies.py
  requirements.txt
  Dockerfile

customer-web/
  src/
    App.jsx
    main.jsx
    pages/
      LoginPage.jsx
      MenuPage.jsx
      CartPage.jsx
      OrderHistoryPage.jsx
    components/
      menu/
      cart/
      order/
      common/
    stores/
      authStore.js
      cartStore.js
    services/
      menuService.js
      orderService.js
    utils/
  package.json
  Dockerfile
```

---

## Unit 2: Admin

### Purpose
관리자용 매장 관리 시스템 (API + Web)

### Responsibilities
- 관리자 인증 (JWT)
- 실시간 주문 모니터링 (SSE)
- 주문 상태 변경
- 테이블 관리 (주문 삭제, 세션 종료, 과거 내역)
- 메뉴 CRUD

### Technology
- Backend: Python FastAPI, SQLAlchemy (shared 모델 import), PyJWT
- Frontend: React, Zustand, ESLint + Prettier

### Directory Structure
```
admin-api/
  app/
    __init__.py
    main.py
    routers/
      auth.py
      orders.py
      tables.py
      menus.py
    services/
      auth_service.py
      order_service.py
      table_service.py
      menu_service.py
    repositories/
      admin_repository.py
      order_repository.py
      session_repository.py
      history_repository.py
      menu_repository.py
    schemas/
      requests.py
      responses.py
    dependencies.py
    sse/
      event_manager.py
  requirements.txt
  Dockerfile

admin-web/
  src/
    App.jsx
    main.jsx
    pages/
      LoginPage.jsx
      DashboardPage.jsx
      TableManagementPage.jsx
      MenuManagementPage.jsx
    components/
      dashboard/
      table/
      menu/
      common/
    stores/
      authStore.js
      orderStore.js
    services/
      orderService.js
      tableService.js
      menuService.js
    utils/
  package.json
  Dockerfile
```

---

## Root Level Files
```
docker-compose.yml
.env
README.md
```
