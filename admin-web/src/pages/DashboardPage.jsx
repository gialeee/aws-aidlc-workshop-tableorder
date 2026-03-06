import { useEffect } from 'react';
import { useOrderStore } from '../stores/orderStore';
import NavBar from '../components/common/NavBar';
import TableGrid from '../components/dashboard/TableGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function DashboardPage() {
  const { orders, startPolling, stopPolling } = useOrderStore();

  useEffect(() => {
    startPolling();
    return () => stopPolling();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">주문 대시보드</h1>
        {orders === null ? <LoadingSpinner /> : <TableGrid orders={orders} />}
      </div>
    </div>
  );
}
