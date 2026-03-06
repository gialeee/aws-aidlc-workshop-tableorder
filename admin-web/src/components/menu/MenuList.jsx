import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import MenuCard from './MenuCard';

function SortableMenuItem({ menu, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: menu.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex items-center gap-2">
        <button {...listeners} className="cursor-grab active:cursor-grabbing px-1 text-gray-400 hover:text-gray-600 touch-none">⠿</button>
        <div className="flex-1">
          <MenuCard menu={menu} onEdit={onEdit} onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
}

export default function MenuList({ menus, onEdit, onDelete, onReorder }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) onReorder(active.id, over.id);
  };

  if (menus.length === 0) return <p className="text-gray-500 py-4">메뉴가 없습니다</p>;

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={menus.map((m) => m.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {menus.map((menu) => (
            <SortableMenuItem key={menu.id} menu={menu} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
