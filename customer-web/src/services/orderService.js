import { apiClient } from './apiClient';

export async function createOrder(items) {
  return apiClient('/orders', {
    method: 'POST',
    body: JSON.stringify({ items }),
  });
}

export async function fetchOrders() {
  return apiClient('/orders');
}
