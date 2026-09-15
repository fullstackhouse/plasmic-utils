import { CSSProperties, ReactNode } from "react";
import { useSortableItemHandle } from "./SortableItemContext";

export interface SortableDragHandleProps {
  "aria-label"?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * The part of a `SortableItem` that starts a drag (pointer or keyboard:
 * Space to lift, arrows to move, Space to drop, Escape to cancel). Rendered
 * inert outside a `SortableItem`, so it can sit in a design without a list.
 */
export function SortableDragHandle({
  "aria-label": ariaLabel = "Drag to reorder",
  className,
  style,
  children,
}: SortableDragHandleProps) {
  const handle = useSortableItemHandle();

  if (handle == null) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={handle.setActivatorNodeRef}
      className={className}
      style={{
        cursor: handle.isDragging ? "grabbing" : "grab",
        touchAction: "none",
        ...style,
      }}
      aria-label={ariaLabel}
      {...handle.attributes}
      {...handle.listeners}
    >
      {children}
    </div>
  );
}
