import { PlasmicComponentLoader } from "@plasmicapp/loader-react";
import { HiddenIfEmptyContainer } from "./HiddenIfEmptyContainer";

export function registerHiddenIfEmptyContainer(
  plasmic: PlasmicComponentLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
) {
  plasmic.registerComponent(HiddenIfEmptyContainer, {
    name: "HiddenIfEmptyContainer",
    description:
      "Currently main root of a Plasmic component needs to be an element that accepts styles (through a className prop). This means logic-only components such as ApiProvider can't be used as root elements of Plasmic components. If that is needed, then place this HiddenifEmptyContainer as the root, and then ApiProvider underneath it. This will prevent your component from rendering an empty div (which may cause e.g. unnecessary whitespace to appear through margin styles).",
    importPath:
      modulePath +
      "/src/code-components/HiddenIfEmptyContainer/HiddenIfEmptyContainer",
    props: {
      style: { type: "object", advanced: true },
      children: "slot",
    },
    styleSections: ["sizing"],
  });
}
