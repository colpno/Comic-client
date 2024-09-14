import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties, memo } from 'react';

interface DraggableProps {
  children: React.ReactNode;
  itemId: UniqueIdentifier;
}

function DraggableWrapper({ children, itemId }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: itemId,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {children}
    </div>
  );
}

export default memo(DraggableWrapper);
