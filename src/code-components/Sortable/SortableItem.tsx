import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties, ReactNode } from "react";
import { MemoDataProvider } from "../MemoDataProvider/MemoDataProvider";
import { SortableItemContext } from "./SortableItemContext";

export interface SortableItemProps {
  /** One of the ids passed to the enclosing `SortableList`. */
  id: string | number;
  disabled?: boolean;
  /**
   * Start a drag from anywhere on the item instead of only from a
   * `SortableDragHandle` inside it.
   */
  wholeItemDraggable?: boolean;
  contextName?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function SortableItem({
  id,
  disabled = false,
  wholeItemDraggable = false,
  contextName = "sortableItem",
  className,
  style,
  children,
}: SortableItemProps) {
  const itemId = String(id);
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
    index,
  } = useSortable({ id: itemId, disabled });

  const itemStyle: CSSProperties = {
    ...style,
    // Translate only: `CSS.Transform` would also scale items of unequal height.
    transform: CSS.Translate.toString(transform),
    transition,
    position: "relative",
    zIndex: isDragging ? 1 : style?.zIndex,
  };

  const draggableProps = wholeItemDraggable
    ? { ...attributes, ...listeners }
    : {};
  const draggableStyle: CSSProperties = wholeItemDraggable
    ? { touchAction: "none", cursor: isDragging ? "grabbing" : "grab" }
    : {};

  return (
    <div
      ref={setNodeRef}
      className={className}
      data-sortable-dragging={isDragging || undefined}
      {...draggableProps}
      style={{ ...itemStyle, ...draggableStyle }}
    >
      <SortableItemContext.Provider
        value={{ attributes, listeners, setActivatorNodeRef, isDragging }}
      >
        <MemoDataProvider
          name={contextName}
          data={{ id: itemId, index, isDragging, isOver }}
          deps={[itemId, index, isDragging, isOver]}
        >
          {children}
        </MemoDataProvider>
      </SortableItemContext.Provider>
    </div>
  );
}
