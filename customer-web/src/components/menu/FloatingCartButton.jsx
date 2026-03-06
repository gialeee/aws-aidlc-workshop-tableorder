export default function FloatingCartButton({ totalCount, onClick }) {
  if (totalCount === 0) return null;

  return (
    <button data-testid="floating-cart-button" onClick={onClick} style={{
      position: 'fixed', bottom: 70, right: 20, width: 56, height: 56, borderRadius: '50%',
      background: '#2ecc71', color: '#fff', border: 'none', fontSize: 24, cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      🛒
      <span style={{
        position: 'absolute', top: -4, right: -4, background: '#e74c3c', color: '#fff',
        borderRadius: '50%', width: 22, height: 22, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{totalCount}</span>
    </button>
  );
}
