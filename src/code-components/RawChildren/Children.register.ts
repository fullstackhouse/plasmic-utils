import { PlasmicComponentLoader } from "@plasmicapp/loader-react";
import { RawChildren } from "./Children";

export function registerRawChildren(
  plasmic: PlasmicComponentLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
) {
  plasmic.registerComponent(RawChildren, {
    name: "RawChildren",
    importPath: modulePath + "/code-components/raw/Children",
    props: { className: { type: "class" }, children: "slot" },
    styleSections: false,
    isAttachment: true,
  });
}
