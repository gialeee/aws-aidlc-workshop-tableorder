import { useState, useEffect } from 'react';
import { fetchOrders } from '../services/orderService';
import OrderCard from '../components/order/OrderCard';
import BottomNav from '../components/common/BottomNav';
import { showToast } from '../components/common/Toast';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch((e) => showToast(e.message, 'error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 16, paddingBottom: 60 }}>
      <h2 style={{ marginBottom: 16 }}>📋 주문 내역</h2>
      {loading && <div style={{ textAlign: 'center', padding: 40, color: '#999' }}>로딩 중...</div>}
      {!loading && orders.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: '#999' }}>주문 내역이 없습니다</div>}
      {orders.map((order) => <OrderCard key={order.id} order={order} />)}
      <BottomNav />
    </div>
  );
}
