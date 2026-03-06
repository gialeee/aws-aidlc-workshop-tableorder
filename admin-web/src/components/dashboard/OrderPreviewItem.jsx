export default function OrderPreviewItem({ item }) {
  return (
    <div className="flex justify-between text-sm text-gray-600">
      <span>{item.menu_name} x{item.quantity}</span>
      <span>{(item.unit_price * item.quantity).toLocaleString()}원</span>
    </div>
  );
}
