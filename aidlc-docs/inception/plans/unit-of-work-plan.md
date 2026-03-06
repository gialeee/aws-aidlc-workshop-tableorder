# Unit of Work Plan

## Overview
Application Design에서 정의된 5개 컴포넌트를 기반으로 개발 단위(Unit of Work)를 분해합니다.

---

## Questions

### Question 1
개발 유닛의 구현 순서는 어떻게 하시겠습니까?

A) Database → Backend APIs → Frontend Apps (Bottom-up: 데이터 레이어부터)
B) Frontend Apps → Backend APIs → Database (Top-down: UI부터)
C) 유닛별 Full-stack (예: 고객용 전체 먼저, 관리자용 전체 다음)
D) Other (please describe after [Answer]: tag below)

[Answer]: C & A

### Question 2
Customer API와 Admin API가 공유하는 DB 모델/스키마는 어떻게 관리하나요?

A) 별도 shared 패키지로 분리하여 두 API에서 import
B) 각 API에서 동일한 모델을 각각 정의 (중복 허용)
C) Admin API에서만 모델 정의하고, Customer API는 raw query 사용
D) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Generation Plan (답변 후 실행)

### Step 1: Unit Definition
- [x] 유닛 목록 및 책임 정의
- [x] 유닛별 기술 스택 명시
- [x] 유닛별 디렉토리 구조 정의

### Step 2: Dependency Matrix
- [x] 유닛 간 의존성 관계 정의
- [x] 구현 순서 결정

### Step 3: Story Mapping
- [x] 각 User Story를 유닛에 매핑
- [x] 매핑 누락 확인

### Step 4: Artifact Generation
- [x] unit-of-work.md 생성
- [x] unit-of-work-dependency.md 생성
- [x] unit-of-work-story-map.md 생성

---

**모든 질문에 답변을 완료하신 후, "완료했습니다" 또는 "done"이라고 알려주세요.**
