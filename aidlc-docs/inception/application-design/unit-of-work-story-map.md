# Unit of Work - Story Map

## Unit 0: Shared (DB + Common)

| Story ID | Story Title | Component |
|----------|------------|-----------|
| - | DB 모델 정의 (9개 엔티티) | shared/models |
| - | Alembic 마이그레이션 설정 | shared/alembic |
| - | bcrypt 유틸리티 | shared/utils |
| - | Docker Compose 설정 | root |

---

## Unit 1: Customer (API + Web)

| Story ID | Story Title | Component |
|----------|------------|-----------|
| US-1.1 | 테이블 초기 설정 | Customer Web + Customer API |
| US-1.2 | 테이블 자동 로그인 | Customer Web + Customer API |
| US-2.1 | 카테고리별 메뉴 목록 조회 | Customer Web + Customer API |
| US-2.2 | 메뉴 상세 정보 확인 | Customer Web + Customer API |
| US-3.1 | 장바구니에 메뉴 추가 | Customer Web |
| US-3.2 | 장바구니 수량 변경 | Customer Web |
| US-3.3 | 장바구니에서 메뉴 삭제 | Customer Web |
| US-3.4 | 장바구니 비우기 | Customer Web |
| US-3.5 | 장바구니 총 금액 표시 | Customer Web |
| US-3.6 | 장바구니 데이터 유지 | Customer Web |
| US-4.1 | 주문 내역 최종 확인 | Customer Web |
| US-4.2 | 주문 확정 | Customer Web + Customer API |
| US-5.1 | 주문 내역 조회 | Customer Web + Customer API |

**Total**: 13 stories

---

## Unit 2: Admin (API + Web)

| Story ID | Story Title | Component |
|----------|------------|-----------|
| US-6.1 | 관리자 로그인 | Admin Web + Admin API |
| US-6.2 | 관리자 세션 유지 | Admin Web + Admin API |
| US-7.1 | 테이블별 주문 대시보드 조회 | Admin Web + Admin API |
| US-7.2 | 실시간 주문 업데이트 수신 | Admin Web + Admin API |
| US-7.3 | 신규 주문 시각적 강조 | Admin Web |
| US-7.4 | 주문 상세 보기 | Admin Web + Admin API |
| US-7.5 | 주문 상태 변경 | Admin Web + Admin API |
| US-8.1 | 주문 삭제 | Admin Web + Admin API |
| US-8.2 | 테이블 세션 종료 | Admin Web + Admin API |
| US-8.3 | 과거 주문 내역 조회 | Admin Web + Admin API |
| US-9.1 | 메뉴 목록 조회 | Admin Web + Admin API |
| US-9.2 | 메뉴 등록 | Admin Web + Admin API |
| US-9.3 | 메뉴 수정 | Admin Web + Admin API |
| US-9.4 | 메뉴 삭제 | Admin Web + Admin API |
| US-9.5 | 메뉴 노출 순서 조정 | Admin Web + Admin API |

**Total**: 15 stories

---

## Coverage Summary

| Unit | Stories | Coverage |
|------|---------|----------|
| Unit 0: Shared | 0 (인프라) | DB 모델, 마이그레이션, 유틸리티 |
| Unit 1: Customer | 13 | US-1.x, US-2.x, US-3.x, US-4.x, US-5.x |
| Unit 2: Admin | 15 | US-6.x, US-7.x, US-8.x, US-9.x |
| **Total** | **28** | **100% coverage** |

모든 28개 User Story가 유닛에 매핑되었으며, 누락된 스토리가 없습니다.
