import type { PlasmicLoader } from "../../plasmic";
import { SortableItem } from "./SortableItem";

export function registerSortableItem(
  plasmic: PlasmicLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
) {
  plasmic.registerComponent(SortableItem, {
    name: "SortableItem",
    description:
      'One reorderable row of a SortableList. Provides `{ id, index, isDragging, isOver, dropPosition }` to its children. `dropPosition` is `"before"` or `"after"` on the item the dragged one would land next to, otherwise `null`; it needs `showDropIndicator` on the SortableList.',
    importPath: modulePath + "/code-components/Sortable/SortableItem",
    props: {
      id: {
        type: "string",
        description:
          "One of the ids passed to the enclosing SortableList, e.g. `currentItem.id`.",
      },
      disabled: { type: "boolean", defaultValue: false },
      wholeItemDraggable: {
        type: "boolean",
        defaultValue: false,
        description:
          "Start a drag from anywhere on the item instead of only from a SortableDragHandle inside it.",
      },
      contextName: {
        type: "string",
        defaultValue: "sortableItem",
        advanced: true,
      },
      style: { type: "object", advanced: true },
      className: { type: "class" },
      children: "slot",
      placeholder: {
        type: "slot",
        description:
          "Fills the place of this item while it is dragged. Needs `showDropIndicator` on the SortableList.",
      },
    },
    providesData: true,
    isAttachment: true,
  });
}
