import { useState, useEffect } from 'react';
import { fetchCategories, fetchMenus } from '../services/menuService';
import useCartStore from '../stores/cartStore';
import CategorySidebar from '../components/menu/CategorySidebar';
import MenuGrid from '../components/menu/MenuGrid';
import FloatingCartButton from '../components/menu/FloatingCartButton';
import CartDrawer from '../components/cart/CartDrawer';
import BottomNav from '../components/common/BottomNav';
import { showToast } from '../components/common/Toast';

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addItem, getTotalCount } = useCartStore();

  useEffect(() => {
    fetchCategories().then((cats) => {
      setCategories(cats);
      if (cats.length > 0) setSelectedCategoryId(cats[0].id);
    }).catch((e) => showToast(e.message, 'error'));
  }, []);

  useEffect(() => {
    if (selectedCategoryId === null) return;
    fetchMenus(selectedCategoryId).then(setMenus).catch((e) => showToast(e.message, 'error'));
  }, [selectedCategoryId]);

  const handleAdd = (menu) => {
    addItem(menu);
    showToast(`${menu.name} 추가됨`);
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 50px)' }}>
      <CategorySidebar categories={categories} selectedId={selectedCategoryId} onSelect={setSelectedCategoryId} />
      <MenuGrid menus={menus} onAdd={handleAdd} />
      <FloatingCartButton totalCount={getTotalCount()} onClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <BottomNav />
    </div>
  );
}
