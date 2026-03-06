# Logical Components - Unit 2: Admin

## Admin API Components

```
admin-api/
├── app/
│   ├── main.py              ← FastAPI app, CORS, lifespan
│   ├── dependencies.py      ← get_db_session, get_current_admin
│   ├── routers/
│   │   ├── auth.py          ← POST /login
│   │   ├── orders.py        ← GET/PUT/DELETE orders, GET stream
│   │   ├── tables.py        ← POST session/end, GET history
│   │   ├── menus.py         ← CRUD menus
│   │   └── categories.py    ← CRUD categories
│   ├── services/
│   │   ├── auth_service.py  ← JWT 발급/검증
│   │   ├── order_service.py ← 주문 관리 + SSE 스트림
│   │   ├── table_service.py ← 세션 종료 + 이력 조회
│   │   ├── menu_service.py  ← 메뉴 CRUD
│   │   └── category_service.py ← 카테고리 CRUD
│   ├── repositories/
│   │   ├── admin_repository.py
│   │   ├── order_repository.py
│   │   ├── history_repository.py
│   │   ├── session_repository.py
│   │   ├── menu_repository.py
│   │   └── category_repository.py
│   └── schemas/
│       ├── requests.py
│       └── responses.py
├── requirements.txt
└── Dockerfile
```

## Admin Web Components

```
admin-web/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── TableManagementPage.jsx
│   │   └── MenuManagementPage.jsx
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── TableGrid.jsx
│   │   │   ├── TableCard.jsx
│   │   │   └── OrderPreviewItem.jsx
│   │   ├── table/
│   │   │   ├── OrderList.jsx
│   │   │   ├── OrderCard.jsx
│   │   │   ├── OrderStatusBadge.jsx
│   │   │   ├── SessionEndButton.jsx
│   │   │   └── OrderHistoryModal.jsx
│   │   ├── menu/
│   │   │   ├── CategoryList.jsx
│   │   │   ├── CategoryForm.jsx
│   │   │   ├── MenuList.jsx
│   │   │   ├── MenuForm.jsx
│   │   │   └── MenuCard.jsx
│   │   └── common/
│   │       ├── NavBar.jsx
│   │       ├── ProtectedRoute.jsx
│   │       ├── ConfirmDialog.jsx
│   │       ├── LoadingSpinner.jsx
│   │       └── Toast.jsx
│   ├── stores/
│   │   ├── authStore.js
│   │   └── orderStore.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── orderService.js
│   │   ├── tableService.js
│   │   ├── menuService.js
│   │   └── categoryService.js
│   └── utils/
│       └── api.js            ← fetch wrapper (JWT 자동 첨부)
├── package.json
├── tailwind.config.js
├── vite.config.js
└── Dockerfile
```
