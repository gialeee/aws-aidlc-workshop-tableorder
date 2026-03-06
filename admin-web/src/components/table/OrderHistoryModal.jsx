import { useState, useCallback } from 'react';
import { tableService } from '../../services/tableService';

export default function OrderHistoryModal({ tableId, onClose }) {
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const data = await tableService.getHistory(tableId, { cursor });
    if (data.length < 20) setHasMore(false);
    if (data.length > 0) setCursor(data[data.length - 1].id);
    setHistory((prev) => [...prev, ...data]);
    setLoading(false);
  }, [tableId, cursor, loading, hasMore]);

  useState(() => { loadMore(); }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">과거 주문 내역</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800" data-testid="history-close">✕</button>
        </div>
        {history.map((h) => (
          <div key={h.id} className="border-b py-3">
            <div className="flex justify-between text-sm">
              <span className="font-mono">{h.order_number}</span>
              <span>{h.total_amount.toLocaleString()}원</span>
            </div>
            <p className="text-xs text-gray-500">{new Date(h.ordered_at).toLocaleString('ko-KR')}</p>
          </div>
        ))}
        {hasMore && (
          <button onClick={loadMore} className="w-full py-2 text-blue-600 text-sm mt-2" data-testid="history-load-more">
            {loading ? '로딩중...' : '더 보기'}
          </button>
        )}
      </div>
    </div>
  );
}
