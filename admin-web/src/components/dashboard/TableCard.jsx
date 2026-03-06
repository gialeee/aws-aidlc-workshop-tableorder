import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../../stores/orderStore';

const STATUS = {
  PENDING: { label: '대기', bg: 'bg-yellow-100 text-yellow-800', btn: 'bg-blue-500 hover:bg-blue-600', next: 'PREPARING', nextLabel: '준비시작' },
  PREPARING: { label: '준비중', bg: 'bg-blue-100 text-blue-800', btn: 'bg-green-500 hover:bg-green-600', next: 'COMPLETED', nextLabel: '완료' },
  COMPLETED: { label: '완료', bg: 'bg-green-100 text-green-800' },
};

function useElapsed(startedAt) {
  const [elapsed, setElapsed] = useState('00:00:00');
  useEffect(() => {
    if (!startedAt) return;
    const calc = () => {
      const diff = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
      const h = String(Math.floor(diff / 3600)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const s = String(diff % 60).padStart(2, '0');
      setElapsed(`${h}:${m}:${s}`);
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [startedAt]);
  return elapsed;
}

export default function TableCard({ tableId, tableNumber, orders }) {
  const navigate = useNavigate();
  const { updateOrderStatus } = useOrderStore();
  const totalAmount = orders.reduce((sum, o) => sum + o.total_amount, 0);
  const sessionStartedAt = orders[0]?.session_started_at;
  const elapsed = useElapsed(sessionStartedAt);

  const handleStatus = (e, orderId, nextStatus) => {
    e.stopPropagation();
    updateOrderStatus(orderId, nextStatus);
  };

  return (
    <div
      onClick={() => navigate(`/tables/${tableId}`)}
      className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition bg-white"
      data-testid={`table-card-${tableNumber}`}
    >
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-bold text-lg">테이블 {tableNumber}</h3>
        <span className="font-semibold text-blue-600">{totalAmount.toLocaleString()}원</span>
      </div>
      <p className="text-xs text-gray-500 mb-3">⏱ {elapsed}</p>

      <div className="space-y-2">
        {orders.map((order) => {
          const s = STATUS[order.status] || STATUS.PENDING;
          return (
            <div key={order.id} className="border rounded p-2 text-sm">
              <div className="flex justify-between items-center mb-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${s.bg}`}>{s.label}</span>
                <span className="text-xs text-gray-400">{order.order_number}</span>
              </div>
              {order.items?.map((item, i) => (
                <div key={i} className="flex justify-between text-gray-600 text-xs">
                  <span>{item.menu_name} x{item.quantity}</span>
                  <span>{(item.unit_price * item.quantity).toLocaleString()}원</span>
                </div>
              ))}
              {s.next && (
                <button
                  onClick={(e) => handleStatus(e, order.id, s.next)}
                  className={`mt-2 w-full text-white text-xs py-1 rounded ${s.btn}`}
                >
                  {s.nextLabel}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
