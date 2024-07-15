import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { RawChildren } from "./Children";

export function registerRawChildren(plasmic: NextJsPlasmicComponentLoader) {
  plasmic.registerComponent(RawChildren, {
    name: "RawChildren",
    importPath: "./src/code-components/raw/Children",
    props: { className: { type: "class" }, children: "slot" },
    styleSections: false,
    isAttachment: true,
  });
}
