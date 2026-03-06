export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div data-testid={`cart-item-${item.menu_id}`} style={{
      display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f0f0f0', gap: 12,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</div>
        <div style={{ fontSize: 13, color: '#888' }}>{item.price.toLocaleString()}원</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button data-testid={`cart-decrease-${item.menu_id}`} onClick={() => onUpdateQuantity(item.menu_id, item.quantity - 1)}
          style={{ width: 32, height: 32, border: '1px solid #ddd', borderRadius: 6, background: '#fff', cursor: 'pointer', fontSize: 16 }}>−</button>
        <span style={{ minWidth: 20, textAlign: 'center', fontSize: 14 }}>{item.quantity}</span>
        <button data-testid={`cart-increase-${item.menu_id}`} onClick={() => onUpdateQuantity(item.menu_id, item.quantity + 1)}
          style={{ width: 32, height: 32, border: '1px solid #ddd', borderRadius: 6, background: '#fff', cursor: 'pointer', fontSize: 16 }}>+</button>
      </div>
      <div style={{ minWidth: 70, textAlign: 'right', fontSize: 14, fontWeight: 600 }}>
        {(item.price * item.quantity).toLocaleString()}원
      </div>
      <button data-testid={`cart-remove-${item.menu_id}`} onClick={() => onRemove(item.menu_id)}
        style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: 18 }}>✕</button>
    </div>
  );
}
