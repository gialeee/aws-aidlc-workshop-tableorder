import { create } from 'zustand';
import { orderService } from '../services/orderService';

export const useOrderStore = create((set, get) => ({
  orders: [],
  pollingId: null,

  fetchOrders: async () => {
    const orders = await orderService.getOrders();
    set({ orders });
  },

  startPolling: () => {
    get().fetchOrders();
    const id = setInterval(() => get().fetchOrders(), 3000);
    set({ pollingId: id });
  },

  stopPolling: () => {
    const { pollingId } = get();
    if (pollingId) clearInterval(pollingId);
    set({ pollingId: null });
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
