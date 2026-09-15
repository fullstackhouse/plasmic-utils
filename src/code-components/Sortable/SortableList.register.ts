import type { PlasmicLoader } from "../../plasmic";
import { SortableList } from "./SortableList";

export function registerSortableList(
  plasmic: PlasmicLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
) {
  plasmic.registerComponent(SortableList, {
    name: "SortableList",
    description:
      "Lets the user reorder the SortableItems inside by drag & drop (pointer or keyboard). Put a SortableItem around each repeated element and a SortableDragHandle inside it.",
    importPath: modulePath + "/code-components/Sortable/SortableList",
    props: {
      items: {
        type: "array",
        description:
          "Ids of the items in their current order, e.g. `$props.rows.map(row => row.id)`. Each SortableItem inside must use one of them.",
      },
      onReorder: {
        type: "eventHandler",
        argTypes: [
          { name: "orderedItems", type: "object" },
          { name: "change", type: "object" },
        ],
        description:
          "Called with the full new order once a drag ends on another position. `change` holds `activeId`, `fromIndex` and `toIndex`.",
      },
      disabled: { type: "boolean", defaultValue: false },
      activationDistance: {
        type: "number",
        defaultValue: 4,
        advanced: true,
        description:
          "Pointer travel in px before a drag starts, so clicks on the handle stay clicks.",
      },
      contextName: {
        type: "string",
        defaultValue: "sortableList",
        advanced: true,
        description:
          "Name of the provided data: `{ items, activeId, disabled }`.",
      },
      style: { type: "object", advanced: true },
      className: { type: "class" },
      children: "slot",
    },
    providesData: true,
  });
}
