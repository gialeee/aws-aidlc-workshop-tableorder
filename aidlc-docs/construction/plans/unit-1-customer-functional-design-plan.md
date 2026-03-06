# Functional Design Plan - Unit 1: Customer

## Plan Steps

- [x] Step 1: Customer API 비즈니스 로직 모델 설계 (인증, 메뉴조회, 주문생성, 주문내역)
- [x] Step 2: Customer API 비즈니스 규칙 상세 정의
- [x] Step 3: Customer Web 프론트엔드 컴포넌트 설계
- [x] Step 4: 문서 생성 (business-logic-model.md, business-rules.md, frontend-components.md)

---

## Questions

### Q1: 테이블 로그인 방식 (US-1.1)

테이블 초기 설정 시 매장 식별자는 어떤 형태인가요?

A) store_id (숫자 ID)
B) store_code (문자열 코드, 예: "STORE001")

[Answer]: B

### Q2: 메뉴 카테고리 탭 위치 (US-2.1)

카테고리 탭을 어디에 배치할까요?

A) 상단 가로 탭
B) 좌측 세로 사이드바

[Answer]: B

### Q3: 장바구니 접근 방식

장바구니를 어떤 형태로 보여줄까요?

A) 하단 고정 바 (아이템 수 + 총액 표시) → 클릭 시 장바구니 페이지
B) 별도 장바구니 페이지 (네비게이션으로 이동)
C) 사이드 드로어 (슬라이드)

[Answer]: C

### Q4: 주문 성공 후 동작 (US-4.2)

주문 성공 시 메뉴 화면으로 자동 리다이렉트 전에 성공 메시지를 얼마나 보여줄까요?

A) 즉시 리다이렉트 (토스트 알림만)
B) 2초 성공 화면 후 리다이렉트
C) 성공 화면에서 사용자가 직접 "확인" 클릭

[Answer]: A

### Q5: 메뉴 카드 레이아웃

메뉴 목록의 카드 레이아웃을 어떻게 할까요?

A) 2열 그리드 (이미지 + 이름 + 가격)
B) 리스트형 (좌측 이미지 + 우측 정보)

[Answer]: 3열 그리드
