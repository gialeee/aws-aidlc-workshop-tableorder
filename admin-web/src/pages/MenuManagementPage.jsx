import { useState, useEffect } from 'react';
import NavBar from '../components/common/NavBar';
import Toast from '../components/common/Toast';
import ConfirmDialog from '../components/common/ConfirmDialog';
import CategoryList from '../components/menu/CategoryList';
import CategoryForm from '../components/menu/CategoryForm';
import MenuList from '../components/menu/MenuList';
import MenuForm from '../components/menu/MenuForm';
import { categoryService } from '../services/categoryService';
import { menuService } from '../services/menuService';

export default function MenuManagementPage() {
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [editCat, setEditCat] = useState(null);
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [editMenu, setEditMenu] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = async () => {
    const [cats, ms] = await Promise.all([categoryService.getCategories(), menuService.getMenus()]);
    setCategories(cats);
    setMenus(ms);
  };

  useEffect(() => { load(); }, []);

  const filteredMenus = selectedCat ? menus.filter((m) => m.category_id === selectedCat) : menus;

  const handleCategorySubmit = async (data) => {
    if (editCat) await categoryService.updateCategory(editCat.id, data);
    else await categoryService.createCategory(data);
    setEditCat(null);
    load();
  };

  const handleDeleteCategory = async (id) => {
    try { await categoryService.deleteCategory(id); load(); }
    catch (err) { setToast({ message: err.message, type: 'error' }); }
  };

  const handleMenuSubmit = async (data) => {
    if (editMenu) await menuService.updateMenu(editMenu.id, data);
    else await menuService.createMenu(data);
    setShowMenuForm(false);
    setEditMenu(null);
    load();
  };

  const handleDeleteMenu = async (id) => {
    await menuService.deleteMenu(id);
    setConfirmDelete(null);
    load();
  };

  const handleReorder = async (activeId, overId) => {
    const oldIdx = menus.findIndex((m) => m.id === activeId);
    const newIdx = menus.findIndex((m) => m.id === overId);
    if (oldIdx < 0 || newIdx < 0) return;
    const reordered = [...menus];
    const [moved] = reordered.splice(oldIdx, 1);
    reordered.splice(newIdx, 0, moved);
    setMenus(reordered);
    await menuService.updateMenu(activeId, { sort_order: newIdx });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-6 flex gap-6">
        <div className="w-64 shrink-0">
          <h2 className="font-bold mb-3">카테고리</h2>
          <CategoryForm category={editCat} onSubmit={handleCategorySubmit} onCancel={editCat ? () => setEditCat(null) : undefined} />
          <div className="mt-3">
            <CategoryList categories={categories} selected={selectedCat} onSelect={setSelectedCat} onEdit={setEditCat} onDelete={handleDeleteCategory} />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">메뉴 목록</h2>
            <button onClick={() => { setEditMenu(null); setShowMenuForm(true); }}
              className="px-4 py-2 bg-blue-600 text-white rounded" data-testid="menu-add-btn">메뉴 등록</button>
          </div>
          <MenuList menus={filteredMenus} onEdit={(m) => { setEditMenu(m); setShowMenuForm(true); }}
            onDelete={(id) => setConfirmDelete(id)} onReorder={handleReorder} />
        </div>
      </div>
      {showMenuForm && <MenuForm menu={editMenu} categories={categories} onSubmit={handleMenuSubmit} onCancel={() => { setShowMenuForm(false); setEditMenu(null); }} />}
      {confirmDelete && <ConfirmDialog message="이 메뉴를 삭제하시겠습니까?" onConfirm={() => handleDeleteMenu(confirmDelete)} onCancel={() => setConfirmDelete(null)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
