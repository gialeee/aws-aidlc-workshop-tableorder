import { apiClient } from './apiClient';

export async function fetchCategories() {
  return apiClient('/categories');
}

export async function fetchMenus(categoryId) {
  const query = categoryId ? `?category_id=${categoryId}` : '';
  return apiClient(`/menus${query}`);
}
