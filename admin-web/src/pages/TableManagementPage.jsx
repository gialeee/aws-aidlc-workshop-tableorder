import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrderStore } from '../stores/orderStore';
import { tableService } from '../services/tableService';
import NavBar from '../components/common/NavBar';
import OrderList from '../components/table/OrderList';
import SessionEndButton from '../components/table/SessionEndButton';
import OrderHistoryModal from '../components/table/OrderHistoryModal';
import Toast from '../components/common/Toast';

export default function TableManagementPage() {
  const { id: tableId } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus, deleteOrder } = useOrderStore();
  const [showHistory, setShowHistory] = useState(false);
  const [toast, setToast] = useState(null);

  const tableOrders = orders.filter((o) => o.table_id === Number(tableId));

  const handleEndSession = async () => {
    try {
      await tableService.endSession(Number(tableId));
      setToast({ message: '이용 완료 처리되었습니다', type: 'success' });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">테이블 {tableId} 관리</h1>
          <div className="flex gap-3">
            <button onClick={() => setShowHistory(true)} className="px-4 py-2 border rounded" data-testid="show-history">과거 내역</button>
            <SessionEndButton onEnd={handleEndSession} />
          </div>
        </div>
        <OrderList orders={tableOrders} onStatusChange={updateOrderStatus} onDelete={deleteOrder} />
      </div>
      {showHistory && <OrderHistoryModal tableId={Number(tableId)} onClose={() => setShowHistory(false)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
