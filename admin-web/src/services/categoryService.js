import { apiFetch } from '../utils/api';

export const categoryService = {
  getCategories: () => apiFetch('/api/admin/categories'),
  createCategory: (data) =>
    apiFetch('/api/admin/categories', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory: (categoryId, data) =>
    apiFetch(`/api/admin/categories/${categoryId}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory: (categoryId) =>
    apiFetch(`/api/admin/categories/${categoryId}`, { method: 'DELETE' }),
};
