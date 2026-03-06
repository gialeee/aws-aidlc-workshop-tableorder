# Unit Test Execution

## Overview
Standard 코드 생성 방식 사용 (non-TDD). 전체 unit test suite 실행 필요.

## Unit 0: Shared Package Tests

### Execute
프로젝트 루트에서:
```bash
PYTHONPATH=. pytest shared/tests/ -v
```

### Expected Results
| File | Tests | Description |
|------|-------|-------------|
| test_password.py | 4 | hash, verify correct/incorrect, unique salts |
| test_models.py | 7 | import check, tablename checks |
| **Total** | **11** | **0 failures expected** |

## Unit 2: Admin API Tests

Admin API는 현재 unit test 파일이 별도로 생성되지 않았습니다 (Standard 방식).
수동 API 테스트로 검증합니다.

### API Endpoint Smoke Tests

PostgreSQL + Admin API가 실행 중인 상태에서:

#### 1. Health Check
```bash
curl -s http://localhost:8001/health | python3 -m json.tool
# Expected: {"status": "ok"}
```

#### 2. Admin Login (사전에 admin 계정 seed 필요)
```bash
curl -s -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}' | python3 -m json.tool
# Expected: {"access_token": "...", "token_type": "bearer"}
```

#### 3. Get Tables (인증 필요)
```bash
TOKEN="<위에서 받은 access_token>"
curl -s http://localhost:8001/api/tables \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
```

#### 4. Get Categories
```bash
curl -s http://localhost:8001/api/categories \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
```

#### 5. Get Menus
```bash
curl -s http://localhost:8001/api/menus \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
```

#### 6. SSE Order Stream
```bash
curl -N http://localhost:8001/api/orders/stream \
  -H "Authorization: Bearer $TOKEN"
# Expected: SSE event stream (data: [...] 형태, 3초 간격)
```

## Unit 2: Admin Web Tests

### Lint Check
```bash
cd admin-web
npm run lint
```

### Build Verification
```bash
cd admin-web
npm run build
```
`dist/` 디렉토리에 빌드 결과물 생성 확인.

## Fix Failing Tests
- shared tests 실패: `PYTHONPATH=.` 확인, `pip install bcrypt` 확인
- admin-api import 에러: 프로젝트 루트에서 `PYTHONPATH=.`으로 실행
- admin-web lint 에러: ESLint 규칙에 따라 코드 수정
- admin-web build 에러: `node_modules` 삭제 후 `npm install` 재실행
