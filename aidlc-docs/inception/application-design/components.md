# Application Components

## System Overview

테이블오더 서비스는 4개의 독립적인 애플리케이션과 1개의 데이터베이스로 구성됩니다.

```
+-------------------+     +-------------------+
|  Customer Web     |     |  Admin Web        |
|  (React SPA)      |     |  (React SPA)      |
+-------------------+     +-------------------+
        |                         |
        v                         v
+-------------------+     +-------------------+
|  Customer API     |     |  Admin API        |
|  (FastAPI)        |     |  (FastAPI)        |
+-------------------+     +-------------------+
        |                         |
        +------------+------------+
                     |
                     v
              +-------------+
              |  PostgreSQL  |
              +-------------+
```

---

## Component 1: Customer Web (customer-web)

### Purpose
고객이 테이블에서 메뉴를 조회하고 주문하는 웹 애플리케이션

### Technology
- React (SPA)
- Zustand (상태 관리)
- ESLint + Prettier (코드 품질)

### Responsibilities
- 테이블 자동 로그인 및 세션 관리
- 메뉴 카테고리별 조회 및 탐색
- 장바구니 관리 (SessionStorage 저장)
- 주문 생성 및 확인
- 주문 내역 조회 (현재 세션)

### Key Pages
- 로그인/초기 설정 페이지
- 메뉴 목록 페이지 (기본 화면)
- 장바구니 페이지
- 주문 내역 페이지

---

## Component 2: Admin Web (admin-web)

### Purpose
매장 관리자가 주문을 실시간 모니터링하고 매장을 관리하는 웹 애플리케이션

### Technology
- React (SPA)
- Zustand (상태 관리)
- ESLint + Prettier (코드 품질)

### Responsibilities
- 관리자 로그인 및 JWT 세션 관리
- 실시간 주문 모니터링 (SSE 수신)
- 주문 상태 변경 (대기중/준비중/완료)
- 테이블 관리 (주문 삭제, 세션 종료, 과거 내역)
- 메뉴 CRUD 관리

### Key Pages
- 로그인 페이지
- 주문 대시보드 (그리드 레이아웃)
- 테이블 관리 페이지
- 메뉴 관리 페이지

---

## Component 3: Customer API (customer-api)

### Purpose
고객용 웹 애플리케이션의 백엔드 API 서버

### Technology
- Python FastAPI
- SQLAlchemy (ORM)
- Alembic (마이그레이션)
- Pylint (코드 품질)

### Responsibilities
- 테이블 인증 (로그인, 세션 관리)
- 메뉴 조회 API
- 주문 생성 API
- 주문 내역 조회 API (현재 세션)

### API Endpoints
- `POST /api/table/login`
- `GET /api/menus`
- `GET /api/menus/{id}`
- `POST /api/orders`
- `GET /api/orders`

---

## Component 4: Admin API (admin-api)

### Purpose
관리자용 웹 애플리케이션의 백엔드 API 서버

### Technology
- Python FastAPI
- SQLAlchemy (ORM)
- Alembic (마이그레이션)
- Pylint (코드 품질)

### Responsibilities
- 관리자 인증 (JWT 발급, 검증)
- 실시간 주문 스트림 (SSE)
- 주문 관리 (상태 변경, 삭제)
- 테이블 관리 (세션 종료, 과거 내역)
- 메뉴 CRUD API

### API Endpoints
- `POST /api/admin/login`
- `GET /api/admin/orders/stream` (SSE)
- `GET /api/admin/orders`
- `PUT /api/admin/orders/{id}/status`
- `DELETE /api/admin/orders/{id}`
- `POST /api/admin/tables/{id}/session/end`
- `GET /api/admin/tables/{id}/history`
- `GET /api/admin/menus`
- `POST /api/admin/menus`
- `PUT /api/admin/menus/{id}`
- `DELETE /api/admin/menus/{id}`

---

## Component 5: Database (PostgreSQL)

### Purpose
모든 애플리케이션 데이터의 영구 저장소

### Entities
- Store (매장)
- Admin (관리자)
- TableInfo (테이블)
- TableSession (테이블 세션)
- Category (카테고리)
- Menu (메뉴)
- Order (주문)
- OrderItem (주문 항목)
- OrderHistory (과거 주문 이력)
