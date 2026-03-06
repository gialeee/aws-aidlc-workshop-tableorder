export default function MenuCard({ menu, onEdit, onDelete }) {
  return (
    <div className="border rounded-lg p-3 bg-white flex justify-between items-center" data-testid={`menu-card-${menu.id}`}>
      <div>
        <p className="font-medium">{menu.name}</p>
        <p className="text-sm text-gray-600">{menu.price.toLocaleString()}원</p>
      </div>
      <div className="flex gap-2 shrink-0">
        <button onClick={() => onEdit(menu)} className="text-sm text-blue-600" data-testid={`menu-edit-${menu.id}`}>수정</button>
        <button onClick={() => onDelete(menu.id)} className="text-sm text-red-600" data-testid={`menu-delete-${menu.id}`}>삭제</button>
      </div>
    </div>
  );
}
