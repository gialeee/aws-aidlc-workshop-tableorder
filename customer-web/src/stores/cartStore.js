import { create } from 'zustand';

const CART_KEY = 'cart';

function loadCart() {
  try {
    const data = sessionStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveCart(items) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(items));
}

const useCartStore = create((set, get) => ({
  items: loadCart(),

  addItem: (menu) => set((state) => {
    const items = { ...state.items };
    if (items[menu.id]) {
      items[menu.id] = { ...items[menu.id], quantity: Math.min(items[menu.id].quantity + 1, 99) };
    } else {
      items[menu.id] = { menu_id: menu.id, name: menu.name, price: menu.price, image_url: menu.image_url, quantity: 1 };
    }
    saveCart(items);
    return { items };
  }),

  updateQuantity: (menuId, quantity) => set((state) => {
    const items = { ...state.items };
    if (quantity <= 0) {
      delete items[menuId];
    } else {
      items[menuId] = { ...items[menuId], quantity: Math.min(quantity, 99) };
    }
    saveCart(items);
    return { items };
  }),

  removeItem: (menuId) => set((state) => {
    const items = { ...state.items };
    delete items[menuId];
    saveCart(items);
    return { items };
  }),

  clearCart: () => {
    saveCart({});
    set({ items: {} });
  },

  getTotalPrice: () => Object.values(get().items).reduce((sum, i) => sum + i.price * i.quantity, 0),
  getTotalCount: () => Object.values(get().items).reduce((sum, i) => sum + i.quantity, 0),
  getItems: () => Object.values(get().items),
}));

export default useCartStore;
