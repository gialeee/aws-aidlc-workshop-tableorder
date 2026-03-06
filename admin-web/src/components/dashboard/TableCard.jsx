import { useNavigate } from 'react-router-dom';
import OrderPreviewItem from './OrderPreviewItem';

export default function TableCard({ tableId, tableNumber, orders }) {
  const navigate = useNavigate();
  const totalAmount = orders.reduce((sum, o) => sum + o.total_amount, 0);
  const recentOrders = orders.slice(0, 5);
  const hasNewOrder = orders.some((o) => o._isNew);

  return (
    <div
      onClick={() => navigate(`/tables/${tableId}`)}
      className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition ${hasNewOrder ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white'}`}
      data-testid={`table-card-${tableNumber}`}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">테이블 {tableNumber}</h3>
        <span className="font-semibold text-blue-600">{totalAmount.toLocaleString()}원</span>
      </div>
      <div className="space-y-1">
        {recentOrders.map((order) =>
          order.items?.slice(0, 2).map((item, i) => (
            <OrderPreviewItem key={`${order.id}-${i}`} item={item} />
          ))
        )}
        {orders.length > 5 && <p className="text-xs text-gray-400">+{orders.length - 5}건 더</p>}
      </div>
    </div>
  );
}
