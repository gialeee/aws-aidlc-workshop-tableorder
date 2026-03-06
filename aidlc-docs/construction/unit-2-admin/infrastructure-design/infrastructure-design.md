# Infrastructure Design - Unit 2: Admin

## Services

### admin-api
- **Image**: Python 3.12-slim Dockerfile
- **Port**: 8001 (host) → 8000 (container)
- **Dependencies**: postgres (healthcheck)
- **Environment**: DATABASE_URL, JWT_SECRET_KEY, LOG_LEVEL, LOG_FILE
- **Network**: tableorder-network
- **Volume**: ./shared:/app/shared (shared 모델 접근)

### admin-web
- **Image**: Node 20 + nginx (multi-stage Dockerfile)
- **Port**: 3001 (host) → 80 (container)
- **Environment**: VITE_API_URL=http://localhost:8001
- **Network**: tableorder-network

## docker-compose.yml 추가 서비스

```yaml
  admin-api:
    build: ./admin-api
    ports:
      - "8001:8000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET_KEY=${JWT_SECRET_KEY}
      - LOG_LEVEL=${LOG_LEVEL}
      - LOG_FILE=admin-api.log
    volumes:
      - ./shared:/app/shared
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - tableorder-network

  admin-web:
    build: ./admin-web
    ports:
      - "3001:80"
    networks:
      - tableorder-network
```

## Port Mapping
| Service | Host Port | Container Port |
|---------|-----------|----------------|
| PostgreSQL | 5432 | 5432 |
| Admin API | 8001 | 8000 |
| Admin Web | 3001 | 80 |
| Customer API (Unit 1) | 8000 | 8000 |
| Customer Web (Unit 1) | 3000 | 80 |
