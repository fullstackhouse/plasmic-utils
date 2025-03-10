import type { PlasmicLoader } from "../../plasmic";
import { RawNull } from "./RawNull";

export function registerRawNull(
  plasmic: PlasmicLoader,
  modulePath = "@fullstackhouse/plasmic-utils/dist",
) {
  plasmic.registerComponent(RawNull, {
    name: "RawNull",
    description:
      "Renders nothing. Useful if you want to set it as a slot's content, so that its' placeholder is not visible in the editor UI.",
    importPath: modulePath + "/code-components/RawNull/RawNull",
    props: {},
    styleSections: false,
  });
}
