import { PlasmicComponentLoader } from "@plasmicapp/loader-react";
import { RawChildren } from "./Children";

export function registerRawChildren(
  plasmic: PlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils",
) {
  plasmic.registerComponent(RawChildren, {
    name: "RawChildren",
    importPath: modulePath + "/src/code-components/raw/Children",
    props: { className: { type: "class" }, children: "slot" },
    styleSections: false,
    isAttachment: true,
  });
}
