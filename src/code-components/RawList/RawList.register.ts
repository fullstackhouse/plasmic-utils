import type { PlasmicLoader } from "../../plasmic";
import { RawLi } from "./Li";
import { RawOl } from "./Ol";
import { RawUl } from "./Ul";

export function registerRawList(
  plasmic: PlasmicLoader,
  modulePath = "@fullstackhouse/plasmic-utils/dist",
) {
  plasmic.registerComponent(RawLi, {
    name: "RawLi",
    importPath: modulePath + "/code-components/RawList/Li",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawOl, {
    name: "RawOl",
    importPath: modulePath + "/code-components/RawList/Ol",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawUl, {
    name: "RawUl",
    importPath: modulePath + "/code-components/RawList/Ul",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });
}
