import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { OnBeforeLogoutProvider } from "./OnBeforeLogoutProvider";

export function registerOnBeforeLogoutProvider(
  plasmic: NextJsPlasmicComponentLoader,
) {
  plasmic.registerComponent(OnBeforeLogoutProvider, {
    name: "OnBeforeLogoutProvider",
    description: "Run code whenever logout is triggered.",
    importPath:
      "./src/code-components/AuthContext/LogoutProvider/OnBeforeLogoutProvider",
    props: {
      onBeforeLogout: {
        type: "eventHandler",
        argTypes: [{ name: "event", type: "object" }],
      },
    },
    styleSections: false,
  });
}
