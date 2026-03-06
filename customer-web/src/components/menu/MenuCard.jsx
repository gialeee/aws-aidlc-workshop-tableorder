export default function MenuCard({ menu, onAdd }) {
  return (
    <div data-testid={`menu-card-${menu.id}`} style={{
      background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ width: '100%', height: 120, background: '#f0f0f0', overflow: 'hidden' }}>
        {menu.image_url
          ? <img src={menu.image_url} alt={menu.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ccc', fontSize: 32 }}>🍽️</div>}
      </div>
      <div style={{ padding: '8px 10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{menu.name}</div>
        <div style={{ fontSize: 14, color: '#2ecc71', fontWeight: 700, marginBottom: 8 }}>{menu.price.toLocaleString()}원</div>
        <button data-testid={`menu-add-${menu.id}`} onClick={() => onAdd(menu)}
          style={{ marginTop: 'auto', padding: '8px 0', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
          담기
        </button>
      </div>
    </div>
  );
}
