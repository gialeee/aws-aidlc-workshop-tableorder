import OrderCard from './OrderCard';

export default function OrderList({ orders, onStatusChange, onDelete }) {
  if (orders.length === 0) return <p className="text-gray-500">주문이 없습니다</p>;
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} onStatusChange={onStatusChange} onDelete={onDelete} />
      ))}
    </div>
  );
}
