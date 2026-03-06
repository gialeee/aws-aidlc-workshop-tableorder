import TableCard from './TableCard';

export default function TableGrid({ orders }) {
  const grouped = {};
  orders.forEach((order) => {
    const key = order.table_id;
    if (!grouped[key]) grouped[key] = { tableId: key, orders: [] };
    grouped[key].orders.push(order);
  });

  const tables = Object.values(grouped);

  if (tables.length === 0) {
    return <p className="text-center text-gray-500 py-12">활성 주문이 없습니다</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {tables.map((t) => (
        <TableCard key={t.tableId} tableId={t.tableId} tableNumber={t.tableId} orders={t.orders} />
      ))}
    </div>
  );
}
