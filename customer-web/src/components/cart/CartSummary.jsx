export default function CartSummary({ totalPrice, totalCount, onOrder, onClear, loading }) {
  return (
    <div data-testid="cart-summary" style={{ padding: '16px 0', borderTop: '2px solid #eee' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 16, fontWeight: 700 }}>
        <span>총 {totalCount}개</span>
        <span>{totalPrice.toLocaleString()}원</span>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button data-testid="cart-clear" onClick={onClear}
          style={{ flex: 1, padding: 12, border: '1px solid #ddd', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 14 }}>
          비우기
        </button>
        <button data-testid="cart-order" onClick={onOrder} disabled={totalCount === 0 || loading}
          style={{
            flex: 2, padding: 12, border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600,
            background: totalCount === 0 ? '#ccc' : '#2ecc71', color: '#fff',
          }}>
          {loading ? '주문 중...' : '주문하기'}
        </button>
      </div>
    </div>
  );
}
