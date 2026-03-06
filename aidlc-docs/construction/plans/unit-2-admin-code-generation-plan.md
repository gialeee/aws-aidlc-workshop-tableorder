# Code Generation Plan - Unit 2: Admin

## Unit Context
- **Stories**: US-6.1~6.2, US-7.1~7.5, US-8.1~8.3, US-9.1~9.5 (15 stories)
- **Dependencies**: Unit 0 (shared models, utils, database)
- **Approach**: Standard (non-TDD)

## Generation Steps

### Admin API

- [ ] Step 1: Project setup - `admin-api/requirements.txt`, `admin-api/app/__init__.py`
- [ ] Step 2: Schemas - `admin-api/app/schemas/requests.py`, `responses.py`
- [ ] Step 3: Repositories - admin, order, history, session, menu, category
- [ ] Step 4: Services - auth, order (SSE 포함), table, menu, category
- [ ] Step 5: Dependencies - `admin-api/app/dependencies.py` (DB session, JWT auth)
- [ ] Step 6: Routers - auth, orders, tables, menus, categories
- [ ] Step 7: Main app - `admin-api/app/main.py` (FastAPI, CORS, router 등록)
- [ ] Step 8: Dockerfile - `admin-api/Dockerfile`

### Admin Web

- [ ] Step 9: Project init - `package.json`, `vite.config.js`, `tailwind.config.js`, `index.html`
- [ ] Step 10: Utils & Services - `api.js`, authService, orderService, tableService, menuService, categoryService
- [ ] Step 11: Stores - authStore, orderStore
- [ ] Step 12: Common components - NavBar, ProtectedRoute, ConfirmDialog, LoadingSpinner, Toast
- [ ] Step 13: LoginPage
- [ ] Step 14: DashboardPage + TableGrid, TableCard, OrderPreviewItem
- [ ] Step 15: TableManagementPage + OrderList, OrderCard, OrderStatusBadge, SessionEndButton, OrderHistoryModal
- [ ] Step 16: MenuManagementPage + CategoryList, CategoryForm, MenuList, MenuForm, MenuCard
- [ ] Step 17: App.jsx + main.jsx (routing)
- [ ] Step 18: Dockerfile + nginx.conf

### Documentation
- [ ] Step 19: Code summary - `aidlc-docs/construction/unit-2-admin/code/code-summary.md`
