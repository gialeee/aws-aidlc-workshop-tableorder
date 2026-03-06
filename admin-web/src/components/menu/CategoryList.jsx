import { useState } from 'react';

export default function CategoryList({ categories, selected, onSelect, onEdit, onDelete }) {
  return (
    <div className="space-y-1">
      {categories.map((cat) => (
        <div key={cat.id}
          className={`flex justify-between items-center px-3 py-2 rounded cursor-pointer ${selected === cat.id ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          onClick={() => onSelect(cat.id)} data-testid={`category-${cat.id}`}>
          <span>{cat.name}</span>
          <div className="flex gap-1">
            <button onClick={(e) => { e.stopPropagation(); onEdit(cat); }} className="text-xs text-blue-600">수정</button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(cat.id); }} className="text-xs text-red-600">삭제</button>
          </div>
        </div>
      ))}
    </div>
  );
}
