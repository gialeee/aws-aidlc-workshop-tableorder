import { create } from 'zustand';
import { orderService } from '../services/orderService';
import { sseUrl } from '../utils/api';

export const useOrderStore = create((set, get) => ({
  orders: [],
  eventSource: null,

  fetchOrders: async () => {
    const orders = await orderService.getOrders();
    set({ orders });
  },

  subscribeToOrders: () => {
    const token = localStorage.getItem('token');
    const es = new EventSource(sseUrl(`/api/admin/orders/stream?token=${token}`));
    es.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      if (payload.event === 'new_order') {
        set((state) => ({ orders: [payload.data, ...state.orders] }));
      }
    };
    es.onerror = () => {
      es.close();
      setTimeout(() => get().subscribeToOrders(), 3000);
    };
    set({ eventSource: es });
  },

  unsubscribe: () => {
    const { eventSource } = get();
    if (eventSource) eventSource.close();
    set({ eventSource: null });
  },

  updateOrderStatus: async (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
    }));
    try {
      await orderService.updateStatus(orderId, status);
    } catch {
      await get().fetchOrders();
    }
  },

  deleteOrder: async (orderId) => {
    await orderService.deleteOrder(orderId);
    set((state) => ({ orders: state.orders.filter((o) => o.id !== orderId) }));
  },
}));
