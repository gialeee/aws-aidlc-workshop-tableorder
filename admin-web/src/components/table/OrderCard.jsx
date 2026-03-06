import { useState } from 'react';
import OrderStatusBadge from './OrderStatusBadge';
import ConfirmDialog from '../common/ConfirmDialog';

const NEXT_STATUS = { PENDING: 'PREPARING', PREPARING: 'COMPLETED' };

export default function OrderCard({ order, onStatusChange, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const nextStatus = NEXT_STATUS[order.status];

  return (
    <div className="border rounded-lg p-4 bg-white" data-testid={`order-card-${order.id}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-sm">{order.order_number}</span>
        <OrderStatusBadge status={order.status} />
      </div>
      <p className="text-xs text-gray-500 mb-2">{new Date(order.created_at).toLocaleString('ko-KR')}</p>
      <div className="space-y-1 mb-3">
        {order.items?.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span>{item.menu_name} x{item.quantity}</span>
            <span>{item.subtotal?.toLocaleString()}원</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center border-t pt-2">
        <span className="font-bold">{order.total_amount?.toLocaleString()}원</span>
        <div className="flex gap-2">
          {nextStatus && (
            <button onClick={() => onStatusChange(order.id, nextStatus)}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded" data-testid={`order-status-${order.id}`}>
              {nextStatus === 'PREPARING' ? '준비시작' : '완료'}
            </button>
          )}
          <button onClick={() => setShowConfirm(true)}
            className="px-3 py-1 bg-red-600 text-white text-sm rounded" data-testid={`order-delete-${order.id}`}>
            삭제
          </button>
        </div>
      </div>
      {showConfirm && (
        <ConfirmDialog message="이 주문을 삭제하시겠습니까?" onConfirm={() => { onDelete(order.id); setShowConfirm(false); }} onCancel={() => setShowConfirm(false)} />
      )}
    </div>
  );
}
