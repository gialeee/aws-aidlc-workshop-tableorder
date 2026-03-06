# Infrastructure Design - Unit 0: Shared

## Docker Compose Configuration

### Services

#### PostgreSQL
- **Image**: postgres:16
- **Port**: 5432 (내부), 5432 (호스트 매핑)
- **Environment**:
  - POSTGRES_DB: tableorder
  - POSTGRES_USER: (from .env)
  - POSTGRES_PASSWORD: (from .env)
- **Volume**: `postgres_data:/var/lib/postgresql/data` (데이터 영속성)
- **Health Check**: `pg_isready -U ${POSTGRES_USER}`
- **Network**: tableorder-network

### Networks
- **tableorder-network**: bridge 타입
  - 모든 서비스가 이 네트워크에 연결
  - 서비스 간 통신은 서비스명으로 DNS 해석

### Volumes
- **postgres_data**: PostgreSQL 데이터 영속 저장

---

## Environment Variables (.env)

```
# Database
POSTGRES_USER=tableorder_user
POSTGRES_PASSWORD=<secure-password>
POSTGRES_DB=tableorder
DATABASE_URL=postgresql+asyncpg://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}

# JWT
JWT_SECRET_KEY=<secure-random-key>
JWT_EXPIRATION_HOURS=16

# Bcrypt
BCRYPT_ROUNDS=12

# Logging
LOG_LEVEL=INFO
LOG_FILE=app.log
```

---

## Shared Package Distribution

### 방식: Local Path Install
- Customer API와 Admin API가 shared 패키지를 로컬 경로로 참조
- Docker 빌드 시 shared 디렉토리를 컨테이너에 복사
- `pip install -e /app/shared` 또는 `pip install /app/shared`

### Docker Build Context
```
docker-compose.yml에서 각 API 서비스의 build context를 프로젝트 루트로 설정
-> shared/ 디렉토리 접근 가능
```

---

## Alembic Migration 실행

### 실행 시점
- 최초 배포 시
- 스키마 변경 시

### 실행 방법
```bash
# Docker Compose 환경에서
docker compose run --rm admin-api alembic upgrade head
```

### 마이그레이션 파일 위치
- `shared/alembic/versions/` 디렉토리
