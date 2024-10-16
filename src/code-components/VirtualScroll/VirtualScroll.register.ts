import type { PlasmicLoader } from "../../plasmic";
import VirtualScrollProvider from "./VirtualScroll";

export function registerVirtualScrollProvider(
  plasmic: PlasmicLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
) {
  plasmic.registerComponent(VirtualScrollProvider, {
    name: "VirtualScrollProvider",
    description:
      "Loads and renders only the visible portion of a list, dynamically loading more items as the user scrolls.",
    importPath: modulePath + "/code-components/VirtualScroll/VirtualScroll",
    props: {
      listHeight: {
        type: "number",
        defaultValue: 500,
      },
      itemHeight: {
        type: "number",
        defaultValue: 50,
      },
      numberOfItems: {
        type: "number",
        defaultValue: 10,
      },
      overscan: {
        type: "number",
        defaultValue: 10,
      },
      children: "slot",
    },
  });
}
