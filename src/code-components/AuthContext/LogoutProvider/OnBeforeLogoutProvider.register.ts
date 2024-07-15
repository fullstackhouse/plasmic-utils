import { PlasmicComponentLoader } from "@plasmicapp/loader-react";
import { OnBeforeLogoutProvider } from "./OnBeforeLogoutProvider";

export function registerOnBeforeLogoutProvider(
  plasmic: PlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils/dist",
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
