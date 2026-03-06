# Business Rules - Unit 0: Shared

## BR-1: 비밀번호 관리

### BR-1.1: 비밀번호 해싱
- 모든 비밀번호는 bcrypt로 해싱하여 저장
- 평문 비밀번호는 절대 DB에 저장하지 않음
- bcrypt work factor: 12 (기본값)

### BR-1.2: 비밀번호 검증
- 입력된 평문 비밀번호를 저장된 해시와 bcrypt.checkpw()로 비교

---

## BR-2: 테이블 세션 관리

### BR-2.1: 세션 시작
- 테이블의 첫 주문 생성 시 활성 세션이 없으면 새 세션 자동 생성
- 세션 ID는 서버에서 UUID v4로 생성
- is_active = True로 설정

### BR-2.2: 세션 종료 (이용 완료)
- 관리자가 "이용 완료" 실행 시:
  1. 해당 세션의 모든 주문을 OrderHistory로 이동
  2. OrderItem 데이터를 JSON으로 변환하여 items_json에 저장
  3. 원본 Order 및 OrderItem 삭제
  4. TableSession.is_active = False, ended_at = now()
- 전체 과정은 단일 트랜잭션으로 처리

### BR-2.3: 활성 세션 조회
- 테이블당 활성 세션(is_active=True)은 최대 1개
- 활성 세션이 없는 테이블은 "빈 테이블" 상태

---

## BR-3: 주문 관리

### BR-3.1: 주문 번호 생성
- 형식: `ORD-{YYYYMMDD}-{순번(4자리)}`
- 예: `ORD-20260306-0001`
- 매장별, 일별 순번 관리

### BR-3.2: 주문 생성
- 주문 생성 시 Order + OrderItem을 단일 트랜잭션으로 생성
- OrderItem에 메뉴명과 단가를 스냅샷으로 저장 (메뉴 변경 시에도 주문 기록 유지)
- total_amount = sum(각 OrderItem의 subtotal)
- 초기 status = 'PENDING'

### BR-3.3: 주문 상태 변경
- 허용 상태 전이:
  - PENDING → PREPARING
  - PREPARING → COMPLETED
- 역방향 전이 불가 (COMPLETED → PENDING 등)
- 관리자만 상태 변경 가능

### BR-3.4: 주문 삭제
- 관리자만 삭제 가능
- 삭제 시 Order + OrderItem 함께 삭제 (CASCADE)
- 단일 트랜잭션으로 처리

---

## BR-4: 메뉴 관리

### BR-4.1: 메뉴 등록 검증
- 필수 필드: name, price, category_id
- 가격 범위: 0 < price <= 1,000,000
- 메뉴명 길이: 1~100자

### BR-4.2: 메뉴 노출 순서
- sort_order 값이 작을수록 먼저 표시
- 기본값: 0
- 동일 sort_order인 경우 id 순서

---

## BR-5: 과거 주문 이력

### BR-5.1: 이력 보관
- 보관 기간: 최근 1년
- 1년 초과 데이터는 조회 시 필터링 (삭제 정책은 별도)

### BR-5.2: 이력 조회
- 날짜 필터링 지원 (date_from, date_to)
- 시간 역순 정렬 (최신순)

---

## BR-6: 인증

### BR-6.1: 관리자 JWT
- 만료 시간: 16시간
- Payload: store_id, admin_id, username, exp
- 알고리즘: HS256

### BR-6.2: 테이블 인증
- 매장 식별자 + 테이블 번호 + 비밀번호로 인증
- 인증 성공 시 세션 토큰 반환 (session_id)
