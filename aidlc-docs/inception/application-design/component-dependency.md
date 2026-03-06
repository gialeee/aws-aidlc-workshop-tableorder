# Component Dependencies

## Dependency Matrix

| Component | Depends On | Communication |
|-----------|-----------|---------------|
| Customer Web | Customer API | HTTP REST |
| Admin Web | Admin API | HTTP REST + SSE |
| Customer API | PostgreSQL | SQLAlchemy (TCP) |
| Admin API | PostgreSQL | SQLAlchemy (TCP) |

---

## Communication Patterns

### Customer Web -> Customer API
- **Protocol**: HTTP REST (JSON)
- **Authentication**: 세션 토큰 (Authorization header)
- **Error Handling**: HTTP status codes + error response body

### Admin Web -> Admin API
- **Protocol**: HTTP REST (JSON) + SSE
- **Authentication**: JWT (Authorization header)
- **SSE**: `GET /api/admin/orders/stream` (단방향 실시간)
- **Error Handling**: HTTP status codes + error response body

### Customer API -> PostgreSQL
- **Protocol**: SQLAlchemy async (asyncpg)
- **Connection**: Connection pool
- **Transaction**: 주문 생성 시 트랜잭션 사용

### Admin API -> PostgreSQL
- **Protocol**: SQLAlchemy async (asyncpg)
- **Connection**: Connection pool
- **Transaction**: 주문 삭제, 세션 종료 시 트랜잭션 사용

### Customer API <-> Admin API (간접 통신)
- **방식**: 직접 통신 없음, PostgreSQL을 통한 간접 데이터 공유
- **SSE 이벤트 감지**: Admin API가 DB 폴링으로 신규 주문 감지

---

## Data Flow Diagrams

### 주문 생성 흐름

```
Customer Web          Customer API         PostgreSQL         Admin API           Admin Web
     |                     |                   |                  |                   |
     | POST /api/orders    |                   |                  |                   |
     |-------------------->|                   |                  |                   |
     |                     | INSERT Order      |                  |                   |
     |                     |------------------>|                  |                   |
     |                     | INSERT OrderItems |                  |                   |
     |                     |------------------>|                  |                   |
     |                     |<-- commit --------|                  |                   |
     |<-- OrderResponse ---|                   |                  |                   |
     |                     |                   |                  |                   |
     |                     |                   | DB Poll/Notify   |                   |
     |                     |                   |----------------->|                   |
     |                     |                   |                  | SSE Event         |
     |                     |                   |                  |------------------>|
     |                     |                   |                  |                   |
```

### 테이블 세션 종료 흐름

```
Admin Web             Admin API            PostgreSQL
     |                     |                   |
     | POST /session/end   |                   |
     |-------------------->|                   |
     |                     | BEGIN TRANSACTION |
     |                     |------------------>|
     |                     | Move orders to    |
     |                     | OrderHistory      |
     |                     |------------------>|
     |                     | Reset table state |
     |                     |------------------>|
     |                     | COMMIT            |
     |                     |------------------>|
     |<-- Success ---------|                   |
     |                     |                   |
```

---

## Deployment Dependencies

```
+---------------------------------------------------+
|                Docker Compose                      |
|                                                    |
|  +--------------+  +--------------+                |
|  | customer-web |  | admin-web    |                |
|  | (React)      |  | (React)      |                |
|  | Port: 3000   |  | Port: 3001   |                |
|  +--------------+  +--------------+                |
|         |                 |                        |
|         v                 v                        |
|  +--------------+  +--------------+                |
|  | customer-api |  | admin-api    |                |
|  | (FastAPI)    |  | (FastAPI)    |                |
|  | Port: 8000   |  | Port: 8001   |                |
|  +--------------+  +--------------+                |
|         |                 |                        |
|         +--------+--------+                        |
|                  |                                  |
|                  v                                  |
|           +--------------+                         |
|           | PostgreSQL   |                         |
|           | Port: 5432   |                         |
|           +--------------+                         |
|                                                    |
+---------------------------------------------------+
```

---

## Shared Database Schema
- Customer API와 Admin API는 동일한 PostgreSQL 데이터베이스를 공유
- 스키마 마이그레이션은 Alembic으로 관리
- 마이그레이션은 하나의 API (Admin API)에서만 실행하여 충돌 방지
