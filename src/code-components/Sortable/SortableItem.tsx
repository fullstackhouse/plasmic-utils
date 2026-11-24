import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties, ReactNode } from "react";
import { MemoDataProvider } from "../MemoDataProvider/MemoDataProvider";
import { SortableItemContext } from "./SortableItemContext";
import { useSortableListSettings } from "./SortableListContext";

/** Side of an item on which the dragged item would land. */
export type SortableDropPosition = "before" | "after";

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
  /**
   * Fills the place of this item while it is dragged. Needs
   * `showDropIndicator` on the `SortableList`.
   */
  placeholder?: ReactNode;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const placeholderStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "grid",
};

// Positioned, so it also covers the placeholder while dnd-kit has no transform
// for it yet (the first frames of a drag).
const contentStyle: CSSProperties = { position: "relative", width: "100%" };

export function SortableItem({
  id,
  disabled = false,
  wholeItemDraggable = false,
  contextName = "sortableItem",
  placeholder,
  className,
  style,
  children,
}: SortableItemProps) {
  const itemId = String(id);
  const { showDropIndicator } = useSortableListSettings();
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
    activeIndex,
  } = useSortable({
    id: itemId,
    // A boolean here overrides the SortableContext flag, so only pass it
    // when this row opts out; otherwise the list's disabled state applies.
    disabled: disabled ? true : undefined,
    // Plasmic keys repeated elements by index, so after a drop each hook
    // instance suddenly represents another row; dnd-kit's layout-change
    // animation would then slide every row from a stale rect. Snap instead.
    animateLayoutChanges: () => false,
  });

  const dragStyle: CSSProperties = {
    // Translate only: `CSS.Transform` would also scale items of unequal height.
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const itemStyle: CSSProperties = {
    ...style,
    ...(showDropIndicator ? {} : dragStyle),
    position: style?.position ?? "relative",
    zIndex: isDragging ? 1 : style?.zIndex,
  };

  const draggableProps = wholeItemDraggable
    ? { ...attributes, ...listeners }
    : {};
  const draggableStyle: CSSProperties = wholeItemDraggable
    ? { touchAction: "none", cursor: isDragging ? "grabbing" : "grab" }
    : {};

  const dropPosition: SortableDropPosition | null =
    showDropIndicator && isOver ? getDropPosition(index, activeIndex) : null;

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
          data={{ id: itemId, index, isDragging, isOver, dropPosition }}
          deps={[itemId, index, isDragging, isOver, dropPosition]}
        >
          {showDropIndicator ? (
            <>
              {isDragging && (
                <div aria-hidden style={placeholderStyle}>
                  {placeholder}
                </div>
              )}
              <div style={{ ...contentStyle, ...dragStyle }}>{children}</div>
            </>
          ) : (
            children
          )}
        </MemoDataProvider>
      </SortableItemContext.Provider>
    </div>
  );
}

function getDropPosition(
  index: number,
  activeIndex: number,
): SortableDropPosition | null {
  if (index === -1 || activeIndex === -1 || index === activeIndex) {
    return null;
  }
  return index > activeIndex ? "after" : "before";
}
