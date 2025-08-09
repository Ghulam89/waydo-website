import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ReactNode, useEffect, useState } from 'react';
import SortableItem from "../sortable-item";

type Props = {
  childrenItems: ReactNode[];
  orderList: (number | string)[];
  onChange: (newList: (number | string)[]) => void;
}

export default function DragSortZone({ childrenItems, orderList, onChange }: Props) {
  const [items, setItems] = useState<(number | string)[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setItems(orderList);
  }, [orderList]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(Number(active.id));
      const newIndex = items.indexOf(Number(over?.id));

      onChange(arrayMove(items, oldIndex, newIndex));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {childrenItems.map((item, i: number) => (
          <SortableItem key={i} id={orderList[i]}>
            {item}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
}