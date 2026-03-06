import { apiFetch } from '../utils/api';

export const menuService = {
  getMenus: () => apiFetch('/api/admin/menus'),
  createMenu: (data) =>
    apiFetch('/api/admin/menus', { method: 'POST', body: JSON.stringify(data) }),
  updateMenu: (menuId, data) =>
    apiFetch(`/api/admin/menus/${menuId}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteMenu: (menuId) =>
    apiFetch(`/api/admin/menus/${menuId}`, { method: 'DELETE' }),
};
