export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <p className="mb-4 text-gray-800">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 border rounded" data-testid="confirm-cancel">취소</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded" data-testid="confirm-ok">확인</button>
        </div>
      </div>
    </div>
  );
}
