import { useState } from 'react';
import ConfirmDialog from '../common/ConfirmDialog';

export default function SessionEndButton({ onEnd }) {
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <>
      <button onClick={() => setShowConfirm(true)} className="px-4 py-2 bg-orange-600 text-white rounded" data-testid="session-end-btn">
        이용 완료
      </button>
      {showConfirm && (
        <ConfirmDialog message="테이블 이용을 완료하시겠습니까? 주문 내역이 과거 이력으로 이동됩니다."
          onConfirm={() => { onEnd(); setShowConfirm(false); }} onCancel={() => setShowConfirm(false)} />
      )}
    </>
  );
}
