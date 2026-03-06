# Functional Design Plan - Unit 2: Admin

## Plan Steps

- [x] Step 1: Admin API 비즈니스 로직 모델 설계 (인증, 주문관리, 테이블관리, 메뉴관리)
- [x] Step 2: Admin API 비즈니스 규칙 상세 정의
- [x] Step 3: Admin Web 프론트엔드 컴포넌트 설계
- [x] Step 4: 문서 생성 (business-logic-model.md, business-rules.md, frontend-components.md)

---

## Questions

### Q1: SSE 폴링 주기
Admin API의 SSE 스트림에서 DB 폴링 주기를 어떻게 설정할까요?

A) 1초
B) 2초
C) 3초
D) 5초

[Answer]: C

### Q2: 대시보드 테이블 카드 미리보기
US-7.1에서 "최신 주문 n개가 미리보기로 표시"라고 했는데, n은 몇 개로 할까요?

A) 2개
B) 3개
C) 5개

[Answer]: C

### Q3: 메뉴 노출 순서 조정 방식 (US-9.5)
메뉴 순서 조정 UI를 어떤 방식으로 구현할까요?

A) 드래그 앤 드롭
B) 위/아래 화살표 버튼
C) sort_order 숫자 직접 입력

[Answer]: A

### Q4: 과거 주문 내역 페이지네이션 (US-8.3)
과거 주문 내역 조회 시 페이지네이션을 적용할까요?

A) 페이지네이션 적용 (20건 단위)
B) 무한 스크롤
C) 전체 로드 (1년 데이터)

[Answer]:B

### Q5: 주문 삭제 시 SSE 이벤트
관리자가 주문을 삭제하면 다른 관리자 화면에도 실시간 반영해야 할까요?

A) 예, SSE로 삭제 이벤트도 전송
B) 아니오, 새로고침 시 반영

[Answer]:A

### Q6: Admin Web 라우팅 구조
Admin Web의 페이지 구조를 어떻게 할까요?

A) 대시보드가 메인, 테이블관리/메뉴관리는 별도 페이지
B) 탭 기반 단일 페이지 (대시보드/테이블관리/메뉴관리 탭)

[Answer]:A

### Q7: 카테고리 관리
메뉴 관리에서 카테고리도 CRUD 가능하게 할까요?

A) 예, 카테고리 CRUD 포함
B) 아니오, 카테고리는 고정 (DB 직접 관리)

[Answer]:A
