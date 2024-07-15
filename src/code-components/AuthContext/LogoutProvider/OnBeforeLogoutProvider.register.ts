import type { PlasmicLoader } from "../../../plasmic";
import { OnBeforeLogoutProvider } from "./OnBeforeLogoutProvider";

export function registerOnBeforeLogoutProvider(
  plasmic: PlasmicLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
) {
  plasmic.registerComponent(OnBeforeLogoutProvider, {
    name: "OnBeforeLogoutProvider",
    description: "Run code whenever logout is triggered.",
    importPath:
      modulePath +
      "/src/code-components/AuthContext/LogoutProvider/OnBeforeLogoutProvider",
    props: {
      onBeforeLogout: {
        type: "eventHandler",
        argTypes: [{ name: "event", type: "object" }],
      },
    },
    styleSections: false,
  });
}
