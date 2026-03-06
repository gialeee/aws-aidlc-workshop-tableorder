import { create } from 'zustand';
import { login as loginApi } from '../services/authService';

const CREDENTIALS_KEY = 'tableOrder_credentials';

const useAuthStore = create((set, get) => ({
  sessionId: sessionStorage.getItem('sessionId') || null,
  storeId: null,
  tableNumber: null,
  isAuthenticated: !!sessionStorage.getItem('sessionId'),

  login: async (storeCode, tableNumber, password) => {
    const data = await loginApi(storeCode, tableNumber, password);
    sessionStorage.setItem('sessionId', data.session_id);
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify({ storeCode, tableNumber, password }));
    set({ sessionId: data.session_id, storeId: data.store_id, tableNumber: data.table_number, isAuthenticated: true });
  },

  autoLogin: async () => {
    const saved = localStorage.getItem(CREDENTIALS_KEY);
    if (!saved) return false;
    try {
      const { storeCode, tableNumber, password } = JSON.parse(saved);
      await get().login(storeCode, tableNumber, password);
      return true;
    } catch {
      localStorage.removeItem(CREDENTIALS_KEY);
      sessionStorage.removeItem('sessionId');
      set({ sessionId: null, storeId: null, tableNumber: null, isAuthenticated: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem(CREDENTIALS_KEY);
    sessionStorage.removeItem('sessionId');
    set({ sessionId: null, storeId: null, tableNumber: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
