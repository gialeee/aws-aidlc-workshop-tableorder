# Domain Entities - Unit 0: Shared

## Entity Relationship Diagram

```
+----------+     1:N     +----------+     1:N     +---------------+
|  Store   |------------>|  Admin   |             | TableSession  |
+----------+             +----------+             +---------------+
     |                                                  |
     | 1:N                                              | 1:N
     v                                                  v
+----------+     1:N     +---------------+         +----------+     1:N     +-----------+
| TableInfo|------------>| TableSession  |         |  Order   |------------>| OrderItem |
+----------+             +---------------+         +----------+             +-----------+
     |                                                  |
     | 1:N                                              | (archive)
     v                                                  v
+----------+     1:N     +----------+             +--------------+
| Category |------------>|   Menu   |             | OrderHistory |
+----------+             +----------+             +--------------+
                              |
                              | 1:N
                              v
                         +-----------+
                         | OrderItem |
                         +-----------+
```

---

## Entity Definitions

### Store (매장)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Integer | PK, Auto Increment | 매장 고유 ID |
| store_id | String(50) | Unique, Not Null | 매장 식별자 (로그인용) |
| name | String(100) | Not Null | 매장명 |
| created_at | DateTime | Not Null, Default Now | 생성 시각 |

### Admin (관리자)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Integer | PK, Auto Increment | 관리자 고유 ID |
| store_id | Integer | FK(Store.id), Not Null | 소속 매장 |
| username | String(50) | Not Null | 사용자명 |
| password_hash | String(255) | Not Null | bcrypt 해싱된 비밀번호 |
| created_at | DateTime | Not Null, Default Now | 생성 시각 |
| **Unique** | (store_id, username) | | 매장 내 사용자명 유일 |

### TableInfo (테이블)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Integer | PK, Auto Increment | 테이블 고유 ID |
| store_id | Integer | FK(Store.id), Not Null | 소속 매장 |
| table_number | Integer | Not Null | 테이블 번호 |
| password_hash | String(255) | Not Null | bcrypt 해싱된 비밀번호 |
| created_at | DateTime | Not Null, Default Now | 생성 시각 |
| **Unique** | (store_id, table_number) | | 매장 내 테이블 번호 유일 |

### TableSession (테이블 세션)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | 세션 고유 ID (서버 생성) |
| table_id | Integer | FK(TableInfo.id), Not Null | 테이블 |
| started_at | DateTime | Not Null, Default Now | 세션 시작 시각 |
| ended_at | DateTime | Nullable | 세션 종료 시각 (이용 완료) |
| is_active | Boolean | Not Null, Default True | 활성 세션 여부 |

### Category (카테고리)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Integer | PK, Auto Increment | 카테고리 고유 ID |
| store_id | Integer | FK(Store.id), Not Null | 소속 매장 |
| name | String(50) | Not Null | 카테고리명 |
| sort_order | Integer | Not Null, Default 0 | 노출 순서 |

### Menu (메뉴)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Integer | PK, Auto Increment | 메뉴 고유 ID |
| store_id | Integer | FK(Store.id), Not Null | 소속 매장 |
| category_id | Integer | FK(Category.id), Not Null | 카테고리 |
| name | String(100) | Not Null | 메뉴명 |
| price | Integer | Not Null | 가격 (원) |
| description | Text | Nullable | 메뉴 설명 |
| image_url | String(500) | Nullable | 이미지 URL |
| sort_order | Integer | Not Null, Default 0 | 노출 순서 |
| is_available | Boolean | Not Null, Default True | 판매 가능 여부 |
| created_at | DateTime | Not Null, Default Now | 생성 시각 |
| updated_at | DateTime | Not Null, Default Now | 수정 시각 |

### Order (주문)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Integer | PK, Auto Increment | 주문 고유 ID |
| store_id | Integer | FK(Store.id), Not Null | 매장 |
| table_id | Integer | FK(TableInfo.id), Not Null | 테이블 |
| session_id | UUID | FK(TableSession.id), Not Null | 테이블 세션 |
| order_number | String(20) | Unique, Not Null | 주문 번호 (표시용) |
| status | String(20) | Not Null, Default 'PENDING' | 주문 상태 |
| total_amount | Integer | Not Null | 총 주문 금액 |
| created_at | DateTime | Not Null, Default Now | 주문 시각 |

**Status Values**: PENDING (대기중), PREPARING (준비중), COMPLETED (완료)

### OrderItem (주문 항목)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Integer | PK, Auto Increment | 항목 고유 ID |
| order_id | Integer | FK(Order.id), Not Null | 주문 |
| menu_id | Integer | FK(Menu.id), Not Null | 메뉴 |
| menu_name | String(100) | Not Null | 주문 시점 메뉴명 (스냅샷) |
| quantity | Integer | Not Null | 수량 |
| unit_price | Integer | Not Null | 주문 시점 단가 (스냅샷) |
| subtotal | Integer | Not Null | 소계 (quantity * unit_price) |

### OrderHistory (과거 주문 이력)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Integer | PK, Auto Increment | 이력 고유 ID |
| original_order_id | Integer | Not Null | 원본 주문 ID |
| store_id | Integer | Not Null | 매장 |
| table_id | Integer | Not Null | 테이블 |
| session_id | UUID | Not Null | 세션 ID |
| order_number | String(20) | Not Null | 주문 번호 |
| status | String(20) | Not Null | 최종 주문 상태 |
| total_amount | Integer | Not Null | 총 금액 |
| items_json | JSON | Not Null | 주문 항목 (JSON 스냅샷) |
| ordered_at | DateTime | Not Null | 원본 주문 시각 |
| archived_at | DateTime | Not Null, Default Now | 이력 이동 시각 |
