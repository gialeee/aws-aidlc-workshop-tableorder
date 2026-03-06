import { apiClient } from './apiClient';

export async function login(storeCode, tableNumber, password) {
  return apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ store_code: storeCode, table_number: tableNumber, password }),
  });
}
