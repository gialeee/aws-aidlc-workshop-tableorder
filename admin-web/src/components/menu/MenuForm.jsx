import { useState, useEffect } from 'react';

export default function MenuForm({ menu, categories, onSubmit, onCancel }) {
  const [form, setForm] = useState({ name: '', price: '', description: '', image_url: '', category_id: '', sort_order: 0 });

  useEffect(() => {
    if (menu) setForm({ name: menu.name, price: menu.price, description: menu.description || '', image_url: menu.image_url || '', category_id: menu.category_id, sort_order: menu.sort_order });
  }, [menu]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, price: Number(form.price), category_id: Number(form.category_id), sort_order: Number(form.sort_order) });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 max-w-md w-full mx-4 space-y-3">
        <h2 className="text-lg font-bold">{menu ? '메뉴 수정' : '메뉴 등록'}</h2>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="메뉴명 *"
          className="w-full border rounded px-3 py-2" data-testid="menu-name-input" required maxLength={100} />
        <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="가격 *"
          className="w-full border rounded px-3 py-2" data-testid="menu-price-input" required min={1} max={1000000} />
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="설명"
          className="w-full border rounded px-3 py-2" data-testid="menu-desc-input" rows={2} />
        <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="이미지 URL"
          className="w-full border rounded px-3 py-2" data-testid="menu-image-input" />
        <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          className="w-full border rounded px-3 py-2" data-testid="menu-category-select" required>
          <option value="">카테고리 선택 *</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">취소</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" data-testid="menu-submit">{menu ? '수정' : '등록'}</button>
        </div>
      </form>
    </div>
  );
}
