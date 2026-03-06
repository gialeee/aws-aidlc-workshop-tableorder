import { apiFetch } from '../utils/api';

export const orderService = {
  getOrders: () => apiFetch('/api/admin/orders'),
  updateStatus: (orderId, status) =>
    apiFetch(`/api/admin/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
  deleteOrder: (orderId) =>
    apiFetch(`/api/admin/orders/${orderId}`, { method: 'DELETE' }),
};
