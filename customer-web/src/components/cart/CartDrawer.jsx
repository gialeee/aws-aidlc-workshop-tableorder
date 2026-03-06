import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../stores/cartStore';
import { createOrder } from '../../services/orderService';
import { showToast } from '../common/Toast';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

export default function CartDrawer({ isOpen, onClose }) {
  const { getItems, getTotalPrice, getTotalCount, updateQuantity, removeItem, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOrder = async () => {
    const items = getItems();
    if (items.length === 0) return;
    setLoading(true);
    try {
      const order = await createOrder(items.map((i) => ({ menu_id: i.menu_id, quantity: i.quantity })));
      clearCart();
      onClose();
      showToast(`주문 완료! (${order.order_number})`);
      navigate('/menu', { replace: true });
    } catch (e) {
      showToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && <div data-testid="cart-overlay" onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200,
      }} />}
      <div data-testid="cart-drawer" style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 340, background: '#fff', zIndex: 201,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.3s ease',
        display: 'flex', flexDirection: 'column', padding: '16px 20px', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>🛒 장바구니</h3>
          <button data-testid="cart-close" onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ flex: 1 }}>
          {getItems().length === 0
            ? <div style={{ textAlign: 'center', color: '#999', padding: 40 }}>장바구니가 비어있습니다</div>
            : getItems().map((item) => (
                <CartItem key={item.menu_id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
              ))}
        </div>
        <CartSummary totalPrice={getTotalPrice()} totalCount={getTotalCount()} onOrder={handleOrder} onClear={clearCart} loading={loading} />
      </div>
    </>
  );
}
