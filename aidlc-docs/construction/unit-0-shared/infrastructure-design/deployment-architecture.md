# Deployment Architecture - Unit 0: Shared

## Overall Architecture

```
+-----------------------------------------------------------+
|                     Docker Compose                         |
|                                                            |
|  +------------------------------------------------------+  |
|  |              tableorder-network (bridge)              |  |
|  |                                                      |  |
|  |  +--------------+          +--------------+          |  |
|  |  | customer-api |          | admin-api    |          |  |
|  |  | (FastAPI)    |          | (FastAPI)    |          |  |
|  |  | Port: 8000   |          | Port: 8001   |          |  |
|  |  +--------------+          +--------------+          |  |
|  |         |                         |                  |  |
|  |         +------------+------------+                  |  |
|  |                      |                               |  |
|  |                      v                               |  |
|  |               +--------------+                       |  |
|  |               | PostgreSQL   |                       |  |
|  |               | Port: 5432   |                       |  |
|  |               +--------------+                       |  |
|  |                      |                               |  |
|  +------------------------------------------------------+  |
|                         |                                  |
|                         v                                  |
|                  +--------------+                          |
|                  | postgres_data|                          |
|                  | (volume)     |                          |
|                  +--------------+                          |
|                                                            |
+-----------------------------------------------------------+
```

Note: customer-web (Port 3000)과 admin-web (Port 3001)은 Unit 1, Unit 2에서 추가됩니다.

---

## Docker Compose Structure (Unit 0 범위)

```yaml
# docker-compose.yml (Unit 0에서 생성, Unit 1/2에서 확장)
services:
  postgres:
    image: postgres:16
    # ... config

volumes:
  postgres_data:

networks:
  tableorder-network:
    driver: bridge
```

---

## Local Development

### 시작
```bash
docker compose up -d postgres    # DB만 시작
alembic upgrade head             # 마이그레이션 실행
```

### 초기 데이터
- 매장, 관리자, 테이블 초기 데이터는 Alembic seed migration 또는 별도 스크립트로 생성
