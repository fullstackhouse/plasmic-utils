import type { PlasmicLoader } from "../../plasmic";
import { RawChildren } from "./Children";

export function registerRawChildren(
  plasmic: PlasmicLoader,
  modulePath = "@fullstackhouse/plasmic-utils/dist",
) {
  plasmic.registerComponent(RawChildren, {
    name: "RawChildren",
    importPath: modulePath + "/code-components/RawChildren/Children",
    props: { className: { type: "class" }, children: "slot" },
    styleSections: false,
    isAttachment: true,
  });
}
