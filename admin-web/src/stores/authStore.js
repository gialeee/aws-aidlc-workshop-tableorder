import { create } from 'zustand';
import { authService } from '../services/authService';

export const useAuthStore = create((set, get) => ({
  token: localStorage.getItem('token'),
  adminId: null,
  username: null,
  storeId: null,

  login: async (storeId, username, password) => {
    const data = await authService.login(storeId, username, password);
    localStorage.setItem('token', data.token);
    set({ token: data.token, adminId: data.admin_id, username: data.username, storeId: data.store_id });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, adminId: null, username: null, storeId: null });
  },

  isAuthenticated: () => !!get().token,
}));
