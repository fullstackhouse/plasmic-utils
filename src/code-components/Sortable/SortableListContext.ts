import { createContext, useContext } from "react";

export interface SortableListSettings {
  showDropIndicator: boolean;
}

export const SortableListContext = createContext<SortableListSettings>({
  showDropIndicator: false,
});

/** Settings of the closest `SortableList` that apply to its items. */
export function useSortableListSettings(): SortableListSettings {
  return useContext(SortableListContext);
}
