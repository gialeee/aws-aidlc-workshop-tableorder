import { apiFetch } from '../utils/api';

export const authService = {
  login: (storeId, username, password) =>
    apiFetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ store_id: storeId, username, password }),
    }),
};
