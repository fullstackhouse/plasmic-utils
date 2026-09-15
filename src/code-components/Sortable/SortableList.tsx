import {
  closestCenter,
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { usePlasmicCanvasContext } from "@plasmicapp/react-web/lib/host";
import { CSSProperties, ReactNode, useId, useMemo, useState } from "react";
import { MemoDataProvider } from "../MemoDataProvider/MemoDataProvider";
import { reorderItems, ReorderResult } from "./reorderItems";

export interface SortableReorderChange extends ReorderResult {
  activeId: string;
}

export interface SortableListProps {
  /** Ids of the items in their current order. Each `SortableItem` inside must use one of them. */
  items: Array<string | number>;
  /** Called with the full new order once a drag ends on another position. */
  onReorder?: (orderedItems: string[], change: SortableReorderChange) => void;
  disabled?: boolean;
  /** Pointer travel in px before a drag starts, so clicks on the handle stay clicks. */
  activationDistance?: number;
  contextName?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function SortableList({
  items,
  onReorder,
  disabled = false,
  activationDistance = 4,
  contextName = "sortableList",
  className,
  style,
  children,
}: SortableListProps) {
  // In the Studio canvas pointer events select elements; a live drag there
  // would fight the editor.
  const inPlasmicCanvas = !!usePlasmicCanvasContext();
  const isDisabled = disabled || inPlasmicCanvas;
  const itemIds = useMemo(() => items.map(String), [items]);
  const [activeId, setActiveId] = useState<string | null>(null);
  // dnd-kit numbers its aria ids per mount; a stable id keeps SSR and client markup equal.
  const dndId = useId();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: activationDistance },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragCancel(_event: DragCancelEvent) {
    setActiveId(null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    if (event.over == null) {
      return;
    }
    const draggedId = String(event.active.id);
    const result = reorderItems(itemIds, draggedId, String(event.over.id));
    if (result == null) {
      return;
    }
    onReorder?.(result.orderedItems, { ...result, activeId: draggedId });
  }

  return (
    <div className={className} style={style}>
      <DndContext
        id={dndId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={itemIds}
          strategy={verticalListSortingStrategy}
          disabled={isDisabled}
        >
          <MemoDataProvider
            name={contextName}
            data={{ items: itemIds, activeId, disabled: isDisabled }}
            deps={[itemIds, activeId, isDisabled]}
          >
            {children}
          </MemoDataProvider>
        </SortableContext>
      </DndContext>
    </div>
  );
}
