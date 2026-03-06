export default function CategorySidebar({ categories, selectedId, onSelect }) {
  return (
    <aside data-testid="category-sidebar" style={{
      width: 120, minHeight: '100%', background: '#fafafa', borderRight: '1px solid #eee',
      overflowY: 'auto', flexShrink: 0,
    }}>
      {categories.map((cat) => (
        <button key={cat.id} data-testid={`category-${cat.id}`} onClick={() => onSelect(cat.id)}
          style={{
            display: 'block', width: '100%', padding: '14px 8px', border: 'none', cursor: 'pointer',
            background: selectedId === cat.id ? '#2ecc71' : 'transparent',
            color: selectedId === cat.id ? '#fff' : '#333', fontSize: 14, textAlign: 'center',
          }}>
          {cat.name}
        </button>
      ))}
    </aside>
  );
}
