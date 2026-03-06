# Integration Test Instructions

## Purpose
Unit 0 (Shared) + Unit 2 (Admin) 간 통합 테스트. Admin API가 shared 모델/DB를 통해 정상 동작하는지 검증합니다.

## Prerequisites
- PostgreSQL 실행 중 (`docker compose up -d`)
- Alembic migration 완료
- Admin API 실행 중 (`PYTHONPATH=. uvicorn admin_api.app.main:app --port 8001`)

## Test Scenarios

### Scenario 1: DB Schema + Admin API 연동
- **Description**: Admin API가 shared 모델을 통해 DB CRUD 수행
- **Test Steps**:
```bash
# 1. Admin 계정으로 로그인
TOKEN=$(curl -s -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}' | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")

# 2. 카테고리 생성
curl -s -X POST http://localhost:8001/api/categories \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "메인메뉴", "sort_order": 1}' | python3 -m json.tool

# 3. 메뉴 생성
curl -s -X POST http://localhost:8001/api/menus \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "김치찌개", "price": 9000, "category_id": 1, "description": "매콤한 김치찌개"}' | python3 -m json.tool

# 4. 메뉴 조회 확인
curl -s http://localhost:8001/api/menus \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
```
- **Expected**: 카테고리/메뉴가 DB에 저장되고 조회 가능

### Scenario 2: 주문 상태 변경 Flow
- **Description**: 주문 상태 전이 (PENDING → PREPARING → COMPLETED)
- **Prerequisite**: 테이블 세션 + 주문이 존재해야 함 (Customer API 또는 직접 DB insert)
- **Test Steps**:
```bash
# 주문 상태 변경 (PENDING → PREPARING)
curl -s -X PATCH http://localhost:8001/api/orders/1/status \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "PREPARING"}' | python3 -m json.tool

# 주문 상태 변경 (PREPARING → COMPLETED)
curl -s -X PATCH http://localhost:8001/api/orders/1/status \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "COMPLETED"}' | python3 -m json.tool
```
- **Expected**: 유효한 상태 전이만 허용 (PENDING→PREPARING→COMPLETED)

### Scenario 3: 테이블 세션 종료 + 주문 이력 아카이빙
- **Description**: 세션 종료 시 주문이 OrderHistory로 이동
- **Test Steps**:
```bash
# 세션 종료
curl -s -X POST http://localhost:8001/api/tables/1/end-session \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool

# 주문 이력 조회
curl -s "http://localhost:8001/api/orders/history?table_id=1" \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
```
- **Expected**: 주문이 삭제되고 OrderHistory에 items_json으로 아카이빙

### Scenario 4: SSE 실시간 스트리밍
- **Description**: SSE endpoint가 새 주문을 실시간 전달
- **Test Steps**:
```bash
# Terminal 1: SSE 스트림 연결
curl -N http://localhost:8001/api/orders/stream \
  -H "Authorization: Bearer $TOKEN"

# Terminal 2: 새 주문 생성 (Customer API 또는 직접 DB insert)
# → Terminal 1에서 3초 이내 새 주문 데이터 수신 확인
```
- **Expected**: 3초 polling 간격으로 새 주문 이벤트 수신

### Scenario 5: Admin Web → Admin API 연동
- **Description**: 브라우저에서 Admin Web이 API와 정상 통신
- **Test Steps**:
  1. `http://localhost:3001` 접속
  2. 로그인 페이지에서 admin 계정으로 로그인
  3. 대시보드에서 테이블 목록 표시 확인
  4. 메뉴 관리 페이지에서 카테고리/메뉴 CRUD 확인
  5. 테이블 클릭 → 주문 목록 표시 확인
- **Expected**: 모든 페이지가 API 데이터를 정상 표시

## Seed Data

통합 테스트를 위해 초기 데이터가 필요합니다. DB에 직접 insert:
```bash
docker compose exec postgres psql -U tableorder_user -d tableorder -c "
INSERT INTO stores (name, address) VALUES ('테스트 매장', '서울시 강남구') ON CONFLICT DO NOTHING;
INSERT INTO admins (store_id, username, password_hash, name)
  VALUES (1, 'admin', '\$2b\$12\$LJ3m4ys3Lk0TSwHjfT3r6u8ZvXwYJ5KQF0QGRJYnWVZhHX1Wq6Gy6', '관리자')
  ON CONFLICT DO NOTHING;
INSERT INTO tables (store_id, table_number, name) VALUES
  (1, 1, '1번 테이블'), (1, 2, '2번 테이블'), (1, 3, '3번 테이블')
  ON CONFLICT DO NOTHING;
"
```
> Note: password_hash는 `admin123`의 bcrypt hash입니다. 실제 hash는 환경에 따라 다를 수 있으므로 Python으로 생성 권장:
> ```python
> from shared.utils.password import hash_password
> print(hash_password("admin123"))
> ```

## Cleanup
```bash
docker compose down -v  # DB 볼륨 포함 삭제
```
