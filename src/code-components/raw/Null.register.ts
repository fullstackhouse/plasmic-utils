import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { RawNull } from "./Null";

export function registerRawNull(
  plasmic: NextJsPlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils",
) {
  plasmic.registerComponent(RawNull, {
    name: "RawNull",
    description:
      "Renders nothing. Useful if you want to set it as a slot's content, so that its' placeholder is not visible in the editor UI.",
    importPath: modulePath + "/src/code-components/raw/Null",
    props: {},
    styleSections: false,
  });
}
