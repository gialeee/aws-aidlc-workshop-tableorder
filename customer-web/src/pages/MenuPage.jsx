import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { fetchCategories, fetchMenus } from '../services/menuService';
import useCartStore from '../stores/cartStore';
import Header from '../components/common/Header';
import CategorySidebar from '../components/menu/CategorySidebar';
import MenuGrid from '../components/menu/MenuGrid';
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
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header totalCount={getTotalCount()} onCartClick={() => setIsCartOpen(true)} />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', pb: '56px' }}>
        <CategorySidebar categories={categories} selectedId={selectedCategoryId} onSelect={setSelectedCategoryId} />
        <MenuGrid menus={menus} onAdd={handleAdd} />
      </Box>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <BottomNav />
    </Box>
  );
}
