# NFR Requirements Plan - Unit 2: Admin

## Plan Steps

- [x] Step 1: Admin API NFR 분석 (SSE 성능, API 응답시간)
- [x] Step 2: Admin Web NFR 분석 (프론트엔드 성능, 접근성)
- [x] Step 3: Tech stack 확정
- [x] Step 4: NFR 문서 생성

---

## Questions

### Q1: Admin API 동시 접속 수
관리자가 동시에 몇 명까지 접속할 것으로 예상하나요?

A) 1~3명 (소규모 매장)
B) 5~10명
C) 10명 이상

[Answer]:

### Q2: SSE 동시 연결 수
SSE 스트림 동시 연결을 몇 개까지 지원할까요?

A) 5개 이하 (관리자 수와 동일)
B) 10개
C) 제한 없음

[Answer]:

### Q3: Admin Web CSS 프레임워크
Admin Web의 스타일링을 어떻게 할까요?

A) Tailwind CSS
B) CSS Modules
C) styled-components
D) 일반 CSS

[Answer]:

### Q4: 드래그앤드롭 라이브러리
메뉴 순서 조정용 드래그앤드롭 라이브러리:

A) @dnd-kit/core (경량, 모던)
B) react-beautiful-dnd (Atlassian)
C) 직접 구현 (HTML5 Drag API)

[Answer]:
