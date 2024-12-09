import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { memo } from 'react';

interface DroppableAreaOnDropArg {
  draggedItemId: UniqueIdentifier;
  droppedItemId: UniqueIdentifier;
  moveArrayItems: typeof arrayMove;
  getPosition: <T>(array: T[], callback: (arrayItem: T) => boolean) => number;
}

interface Props {
  children: React.ReactNode;
  itemIds: UniqueIdentifier[];
  onDrop: (arg: DroppableAreaOnDropArg) => void;
}

function DroppableWrapper({ children, itemIds, onDrop }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDrop = ({ active: draggedItem, over }: DragEndEvent) => {
    const droppedItem = over!;

    const sameItem = draggedItem.id === droppedItem.id;
    if (sameItem) return;

    onDrop({
      draggedItemId: draggedItem.id,
      droppedItemId: droppedItem.id,
      moveArrayItems: arrayMove,
      getPosition: (array, callback) => array.findIndex(callback),
    });
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDrop}>
      <SortableContext items={itemIds} strategy={rectSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}

export default memo(DroppableWrapper);
