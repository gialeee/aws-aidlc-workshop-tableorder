# Business Rules - Unit 2: Admin

## BR-A1: 관리자 인증

### BR-A1.1: 로그인
- store_id + username + password로 인증
- bcrypt 비밀번호 검증
- 실패 시 "Invalid credentials" (store/username 존재 여부 노출 금지)

### BR-A1.2: JWT 토큰
- 알고리즘: HS256
- 만료: 16시간
- Payload: store_id, admin_id, username, exp
- 모든 API 요청에 Authorization: Bearer {token} 필요 (login 제외)

### BR-A1.3: 토큰 만료
- 만료된 토큰으로 요청 시 401 반환
- 프론트엔드에서 로그인 페이지로 리다이렉트

---

## BR-A2: 주문 상태 관리

### BR-A2.1: 상태 전이 규칙
- PENDING → PREPARING (허용)
- PREPARING → COMPLETED (허용)
- 그 외 모든 전이 불가 (400 에러)

### BR-A2.2: 주문 삭제
- 모든 상태의 주문 삭제 가능
- 삭제 전 확인 필수 (프론트엔드)
- CASCADE로 OrderItem 함께 삭제

---

## BR-A3: SSE 실시간 업데이트

### BR-A3.1: 폴링
- 3초 간격 DB 폴링
- 마지막 체크 시점 이후 변경사항 감지

### BR-A3.2: 이벤트 타입
- `new_order`: 신규 주문 생성
- `status_changed`: 주문 상태 변경
- `order_deleted`: 주문 삭제

### BR-A3.3: 재연결
- 연결 끊김 시 클라이언트 자동 재연결
- EventSource 기본 재연결 메커니즘 사용

---

## BR-A4: 테이블 세션 종료

### BR-A4.1: 이용 완료 프로세스
1. 해당 세션의 모든 Order 조회
2. 각 Order → OrderHistory 변환
   - OrderItem을 JSON 배열로 변환하여 items_json에 저장
   - ordered_at = Order.created_at
   - archived_at = now()
3. 원본 Order + OrderItem 삭제
4. TableSession.is_active = False, ended_at = now()
- 전체 단일 트랜잭션

### BR-A4.2: 과거 내역 조회
- 커서 기반 무한스크롤 (20건 단위)
- 날짜 필터: date_from, date_to
- 최근 1년 데이터만 조회
- 시간 역순 정렬

---

## BR-A5: 메뉴 관리

### BR-A5.1: 메뉴 CRUD 검증
- 필수: name (1~100자), price (1~1,000,000), category_id
- 선택: description, image_url
- category_id는 해당 매장의 유효한 카테고리여야 함

### BR-A5.2: 메뉴 순서
- 드래그앤드롭으로 sort_order 변경
- 같은 카테고리 내에서 순서 조정

---

## BR-A6: 카테고리 관리

### BR-A6.1: 카테고리 CRUD
- 필수: name, store_id
- 선택: sort_order (기본 0)
- 삭제 시 해당 카테고리에 메뉴가 있으면 삭제 불가

---

## BR-A7: 대시보드

### BR-A7.1: 테이블 카드
- 테이블별 카드에 총 주문액 표시
- 최신 주문 5개 미리보기
- 활성 세션이 있는 테이블만 주문 정보 표시

### BR-A7.2: 신규 주문 강조
- 새 주문 수신 시 해당 테이블 카드 하이라이트
- 일정 시간 후 하이라이트 해제
