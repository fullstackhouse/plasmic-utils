import type { PlasmicLoader } from "../../plasmic";
import VirtualScroll from "./VirtualScroll";

export function registerVirtualScroll(
  plasmic: PlasmicLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
) {
  plasmic.registerComponent(VirtualScroll, {
    name: "VirtualScroll",
    description:
      "Loads and renders only the visible portion of a list, dynamically loading more items as the user scrolls.",
    importPath: modulePath + "/code-components/VirtualScroll/VirtualScroll",
    props: {
      style: { type: "object", defaultValue: { height: 500 } },
      className: { type: "class" },
      children: "slot",
    },
  });
}
