import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import MenuCard from './MenuCard';

function SortableMenuItem({ menu, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: menu.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <MenuCard menu={menu} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

export default function MenuList({ menus, onEdit, onDelete, onReorder }) {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) onReorder(active.id, over.id);
  };

  if (menus.length === 0) return <p className="text-gray-500 py-4">메뉴가 없습니다</p>;

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
