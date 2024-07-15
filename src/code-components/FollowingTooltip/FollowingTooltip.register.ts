import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { FollowingTooltip } from "./FollowingTooltip";

export function registerFollowingTooltip(
  plasmic: NextJsPlasmicComponentLoader,
) {
  plasmic.registerComponent(FollowingTooltip, {
    name: "RawFollowingTooltip",
    importName: "FollowingTooltip",
    importPath: "./src/code-components/FollowingTooltip/FollowingTooltip",
    props: {
      content: { type: "string", defaultValue: "Example value" },
      delay: { type: "number", defaultValue: 300 },
      children: { type: "slot" },
      contentClassName: { type: "class" },
    },
  });
}
