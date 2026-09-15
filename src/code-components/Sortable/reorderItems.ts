import { arrayMove } from "@dnd-kit/sortable";

export interface ReorderResult {
  orderedItems: string[];
  fromIndex: number;
  toIndex: number;
}

/**
 * Moves `activeId` to the position of `overId`. Returns `null` when nothing
 * changes (same id, or an id that is not in the list), so callers can skip
 * the `onReorder` round-trip.
 */
export function reorderItems(
  items: string[],
  activeId: string,
  overId: string,
): ReorderResult | null {
  if (activeId === overId) {
    return null;
  }
  const fromIndex = items.indexOf(activeId);
  const toIndex = items.indexOf(overId);
  if (fromIndex === -1 || toIndex === -1) {
    return null;
  }
  return {
    orderedItems: arrayMove(items, fromIndex, toIndex),
    fromIndex,
    toIndex,
  };
}
