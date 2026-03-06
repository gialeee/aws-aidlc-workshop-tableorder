import { useState, useEffect } from 'react';

export default function CategoryForm({ category, onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [sortOrder, setSortOrder] = useState(0);

  useEffect(() => {
    if (category) { setName(category.name); setSortOrder(category.sort_order); }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, sort_order: sortOrder });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="카테고리명"
        className="border rounded px-2 py-1 text-sm" data-testid="category-name-input" required />
      <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))}
        className="border rounded px-2 py-1 text-sm w-16" data-testid="category-sort-input" />
      <button type="submit" className="px-3 py-1 bg-blue-600 text-white text-sm rounded" data-testid="category-submit">
        {category ? '수정' : '추가'}
      </button>
      {onCancel && <button type="button" onClick={onCancel} className="px-3 py-1 border text-sm rounded">취소</button>}
    </form>
  );
}
