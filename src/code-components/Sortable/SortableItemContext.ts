import type { useSortable } from "@dnd-kit/sortable";
import { createContext, useContext } from "react";

type Sortable = ReturnType<typeof useSortable>;

export interface SortableItemHandle {
  attributes: Sortable["attributes"];
  listeners: Sortable["listeners"];
  setActivatorNodeRef: Sortable["setActivatorNodeRef"];
  isDragging: boolean;
}

export const SortableItemContext = createContext<SortableItemHandle | null>(
  null,
);

/** The drag activator of the closest `SortableItem`, or `null` outside one. */
export function useSortableItemHandle(): SortableItemHandle | null {
  return useContext(SortableItemContext);
}
