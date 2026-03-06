# Deployment Architecture - Unit 1: Customer

## Updated Architecture

```
+-----------------------------------------------------------+
|                     Docker Compose                         |
|                                                            |
|  +------------------------------------------------------+  |
|  |              tableorder-network (bridge)              |  |
|  |                                                      |  |
|  |  +--------------+          +--------------+          |  |
|  |  | customer-web |          | admin-web    |          |  |
|  |  | (Nginx+React)|          | (Unit 2)     |          |  |
|  |  | Port: 3001   |          |              |          |  |
|  |  +--------------+          +--------------+          |  |
|  |         |                                            |  |
|  |         | /api/* proxy                               |  |
|  |         v                                            |  |
|  |  +--------------+          +--------------+          |  |
|  |  | customer-api |          | admin-api    |          |  |
|  |  | (FastAPI)    |          | (Unit 2)     |          |  |
|  |  | Port: 8001   |          |              |          |  |
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
|                  +--------------+                          |
|                  | postgres_data|                          |
|                  +--------------+                          |
+-----------------------------------------------------------+
```

---

## Service Communication

```
Browser → :3001 → Nginx (customer-web)
                    ├── static files (React SPA)
                    └── /api/* → customer-api:8000 → PostgreSQL
```

- customer-web의 Nginx가 API 프록시 역할
- 브라우저에서 CORS 이슈 없음 (같은 origin)
- customer-api는 Docker 내부 네트워크에서만 접근

---

## docker-compose.yml 확장 (Unit 1 추가분)

```yaml
services:
  # ... (Unit 0: postgres)

  customer-api:
    build:
      context: .
      dockerfile: customer-api/Dockerfile
    ports:
      - "${CUSTOMER_API_PORT:-8001}:8000"
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - LOG_LEVEL=${LOG_LEVEL:-INFO}
    networks:
      - tableorder-network

  customer-web:
    build:
      context: ./customer-web
    ports:
      - "${CUSTOMER_WEB_PORT:-3001}:80"
    depends_on:
      - customer-api
    networks:
      - tableorder-network
```
