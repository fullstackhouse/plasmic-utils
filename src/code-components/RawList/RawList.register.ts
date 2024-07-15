import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { RawLi } from "./Li";
import { RawOl } from "./Ol";
import { RawUl } from "./Ul";

export function registerRawList(
  plasmic: NextJsPlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils",
) {
  plasmic.registerComponent(RawLi, {
    name: "RawLi",
    importPath: modulePath + "/src/code-components/raw/Li",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawOl, {
    name: "RawOl",
    importPath: modulePath + "/src/code-components/raw/Ol",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawUl, {
    name: "RawUl",
    importPath: modulePath + "/src/code-components/raw/Ul",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });
}
