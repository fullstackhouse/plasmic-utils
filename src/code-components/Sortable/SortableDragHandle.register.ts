import type { PlasmicLoader } from "../../plasmic";
import { SortableDragHandle } from "./SortableDragHandle";

export function registerSortableDragHandle(
  plasmic: PlasmicLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
) {
  plasmic.registerComponent(SortableDragHandle, {
    name: "SortableDragHandle",
    description:
      "The part of a SortableItem that starts a drag: pointer, or keyboard (Space to lift, arrows to move, Space to drop, Escape to cancel). Put the grip icon inside.",
    importPath: modulePath + "/code-components/Sortable/SortableDragHandle",
    props: {
      "aria-label": { type: "string", defaultValue: "Drag to reorder" },
      style: { type: "object", advanced: true },
      className: { type: "class" },
      children: "slot",
    },
    isAttachment: true,
  });
}
