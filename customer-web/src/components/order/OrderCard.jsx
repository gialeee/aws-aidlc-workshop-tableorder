const STATUS_MAP = { PENDING: { label: '대기중', color: '#f39c12' }, PREPARING: { label: '준비중', color: '#3498db' }, COMPLETED: { label: '완료', color: '#2ecc71' } };

export default function OrderCard({ order }) {
  const status = STATUS_MAP[order.status] || { label: order.status, color: '#999' };

  return (
    <div data-testid={`order-card-${order.id}`} style={{
      background: '#fff', borderRadius: 10, padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontWeight: 600, fontSize: 14 }}>{order.order_number}</span>
        <span style={{ padding: '2px 10px', borderRadius: 12, fontSize: 12, color: '#fff', background: status.color }}>{status.label}</span>
      </div>
      <div style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>{new Date(order.created_at).toLocaleString('ko-KR')}</div>
      {order.items.map((item) => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0' }}>
          <span>{item.menu_name} × {item.quantity}</span>
          <span>{item.subtotal.toLocaleString()}원</span>
        </div>
      ))}
      <div style={{ borderTop: '1px solid #eee', marginTop: 8, paddingTop: 8, textAlign: 'right', fontWeight: 700, fontSize: 15 }}>
        {order.total_amount.toLocaleString()}원
      </div>
    </div>
  );
}
