import { PlasmicComponentLoader } from "@plasmicapp/loader-react";
import { FollowingTooltip } from "./FollowingTooltip";

export function registerFollowingTooltip(
  plasmic: PlasmicComponentLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
) {
  plasmic.registerComponent(FollowingTooltip, {
    name: "RawFollowingTooltip",
    importName: "FollowingTooltip",
    importPath:
      modulePath + "/code-components/FollowingTooltip/FollowingTooltip",
    props: {
      content: { type: "string", defaultValue: "Example value" },
      delay: { type: "number", defaultValue: 300 },
      children: { type: "slot" },
      contentClassName: { type: "class" },
    },
  });
}
