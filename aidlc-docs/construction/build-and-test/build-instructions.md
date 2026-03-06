# Build Instructions

## Prerequisites
- **Python**: 3.12+
- **Docker**: Docker Desktop 또는 Docker Engine + Docker Compose
- **pip**: Python 패키지 매니저

## Build Steps

### 1. Start PostgreSQL
```bash
docker compose up -d
```
PostgreSQL이 healthy 상태가 될 때까지 대기:
```bash
docker compose ps
```

### 2. Install Dependencies
```bash
cd shared
pip install -r requirements.txt
```

### 3. Run Alembic Migration
```bash
cd shared
alembic upgrade head
```

### 4. Verify Build Success
- PostgreSQL 컨테이너가 running 상태
- `alembic upgrade head` 에러 없이 완료
- 9개 테이블 생성 확인:
```bash
docker compose exec postgres psql -U tableorder_user -d tableorder -c "\dt"
```

## Troubleshooting

### Docker 관련
- **Port 5432 already in use**: 로컬 PostgreSQL 중지 후 재시도
- **Permission denied**: `sudo` 사용 또는 Docker 그룹에 사용자 추가

### Alembic 관련
- **Connection refused**: PostgreSQL 컨테이너가 healthy 상태인지 확인
- **Module not found**: `shared/` 상위 디렉토리에서 `PYTHONPATH=. alembic upgrade head` 실행
