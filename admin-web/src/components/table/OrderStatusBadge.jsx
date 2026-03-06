const STATUS_MAP = {
  PENDING: { label: '대기중', color: 'bg-yellow-100 text-yellow-800' },
  PREPARING: { label: '준비중', color: 'bg-blue-100 text-blue-800' },
  COMPLETED: { label: '완료', color: 'bg-green-100 text-green-800' },
};

export default function OrderStatusBadge({ status }) {
  const { label, color } = STATUS_MAP[status] || { label: status, color: 'bg-gray-100' };
  return <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>{label}</span>;
}
