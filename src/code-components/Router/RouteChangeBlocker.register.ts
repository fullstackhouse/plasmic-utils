import type { PlasmicLoader } from "../../plasmic";
import { RouteChangeBlocker } from "./RouteChangeBlocker";

export function registerRouteChangeBlocker(
  plasmic: PlasmicLoader,
  modulePath = "@fullstackhouse/plasmic-utils/dist",
) {
  plasmic.registerComponent(RouteChangeBlocker, {
    name: "RouteChangeBlocker",
    importPath: modulePath + "/code-components/Router/RouteChangeBlocker",
    description: `Prevents route changes. Sets a blocker context object when it happens, which can be used to proceed the route change.`,
    props: {
      name: {
        type: "string",
        defaultValue: "blocker",
      },
      enabled: {
        type: "boolean",
        defaultValue: true,
      },
      children: "slot",
    },
    styleSections: false,
    providesData: true,
    isAttachment: true,
  });
}
