# Build Instructions

## Prerequisites
- **Python**: 3.12+
- **Node.js**: 20+
- **Docker**: Docker Desktop 또는 Docker Engine + Docker Compose
- **pip**: Python 패키지 매니저
- **npm**: Node.js 패키지 매니저

## Architecture Overview
```
[PostgreSQL:5432] ← [Admin API:8001] ← [Admin Web:3001]
                 ← [shared/ models, config, utils]
```

## Build Steps

### 1. Start PostgreSQL
```bash
docker compose up -d
```
healthy 상태 확인:
```bash
docker compose ps
```

### 2. Install Shared Dependencies & Run Migration
```bash
cd shared
pip install -r requirements.txt
PYTHONPATH=.. alembic upgrade head
cd ..
```
9개 테이블 생성 확인:
```bash
docker compose exec postgres psql -U tableorder_user -d tableorder -c "\dt"
```

### 3. Install Admin API Dependencies
```bash
cd admin-api
pip install -r requirements.txt
cd ..
```

### 4. Start Admin API
```bash
PYTHONPATH=. uvicorn admin_api.app.main:app --host 0.0.0.0 --port 8001 --reload
```
Health check:
```bash
curl http://localhost:8001/health
# Expected: {"status":"ok"}
```

### 5. Install Admin Web Dependencies & Start
```bash
cd admin-web
npm install
npm run dev
cd ..
```
브라우저에서 `http://localhost:3001` 접속 확인.

### 6. (Optional) Docker Compose Full Stack
docker-compose.yml에 admin-api, admin-web 서비스를 추가하여 전체 스택을 한 번에 실행할 수 있습니다:
```bash
docker compose up -d
```

## Troubleshooting

### Port 충돌
- **5432**: 로컬 PostgreSQL 중지 → `brew services stop postgresql`
- **8001**: 기존 프로세스 확인 → `lsof -i :8001`
- **3001**: 기존 프로세스 확인 → `lsof -i :3001`

### Import 에러 (admin-api)
admin-api는 `shared` 패키지를 참조합니다. 반드시 프로젝트 루트에서 `PYTHONPATH=.`으로 실행:
```bash
PYTHONPATH=. uvicorn admin_api.app.main:app --port 8001
```

### DB 연결 실패
- `.env` 파일이 프로젝트 루트에 있는지 확인
- `DATABASE_URL`의 host가 로컬 실행 시 `localhost`, Docker 내부 실행 시 `postgres`인지 확인

### npm install 실패
```bash
rm -rf node_modules package-lock.json
npm install
```
