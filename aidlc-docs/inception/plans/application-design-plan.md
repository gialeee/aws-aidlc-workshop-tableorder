# Application Design Plan

## Overview
테이블오더 서비스의 컴포넌트 구조, 서비스 레이어, 의존성 관계를 설계합니다.

---

## Design Questions

### Question 1
프론트엔드 프로젝트 구조는 어떻게 구성하나요?

A) Monorepo - 고객용과 관리자용을 하나의 React 프로젝트에서 라우팅으로 분리
B) Multi-repo - 고객용과 관리자용을 별도 React 프로젝트로 분리
C) Other (please describe after [Answer]: tag below)

[Answer]: B

### Question 2
백엔드 API 구조는 어떻게 구성하나요?

A) 단일 FastAPI 앱에서 라우터로 분리 (customer router, admin router)
B) 고객용 API와 관리자용 API를 별도 FastAPI 앱으로 분리
C) Other (please describe after [Answer]: tag below)

[Answer]: B

### Question 3
프론트엔드 상태 관리는 어떻게 하나요?

A) React Context API만 사용
B) Redux / Redux Toolkit
C) Zustand
D) React Query (서버 상태) + Context (클라이언트 상태)
E) Other (please describe after [Answer]: tag below)

[Answer]: C

### Question 4
백엔드 ORM은 무엇을 사용하나요?

A) SQLAlchemy (가장 널리 사용)
B) Tortoise ORM (async 네이티브)
C) SQLModel (FastAPI 제작자가 만든 ORM)
D) Raw SQL (ORM 없이)
E) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 5
데이터베이스 마이그레이션 도구는 무엇을 사용하나요?

A) Alembic (SQLAlchemy 기반)
B) 수동 SQL 스크립트
C) ORM 자동 마이그레이션
D) Other (please describe after [Answer]: tag below)

[Answer]: 지금 구성으로 너가 알아서 추천해줘

---

## Design Execution Plan (답변 후 실행)

### Step 1: Component Identification
- [x] 프론트엔드 컴포넌트 구조 정의
- [x] 백엔드 컴포넌트 구조 정의
- [x] 데이터베이스 컴포넌트 정의

### Step 2: Component Methods
- [x] 프론트엔드 주요 컴포넌트별 메서드 정의
- [x] 백엔드 API 라우터별 엔드포인트 정의
- [x] 서비스 레이어 메서드 정의

### Step 3: Service Layer Design
- [x] 서비스 정의 및 책임 분리
- [x] 서비스 간 상호작용 패턴 정의

### Step 4: Component Dependencies
- [x] 의존성 관계 매트릭스 작성
- [x] 통신 패턴 정의
- [x] 데이터 흐름 다이어그램 작성

### Step 5: Artifact Generation
- [x] components.md 생성
- [x] component-methods.md 생성
- [x] services.md 생성
- [x] component-dependency.md 생성

---

**모든 질문에 답변을 완료하신 후, "완료했습니다" 또는 "done"이라고 알려주세요.**
