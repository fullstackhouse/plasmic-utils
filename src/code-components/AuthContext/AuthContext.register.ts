import type { PlasmicLoader } from "../../plasmic";
import { AuthContextProvider } from "./AuthContextProvider";
import { OnBeforeLogoutProvider } from "./LogoutProvider/OnBeforeLogoutProvider";

export function registerAuthContext(
  plasmic: PlasmicLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
) {
  plasmic.registerGlobalContext(AuthContextProvider, {
    name: "AuthContext",
    importPath: modulePath + "/code-components/AuthContext/AuthContextProvider",
    importName: "AuthContextProvider",
    props: {
      userId: {
        type: "string",
        defaultValue: "2",
      },
      departmentId: {
        type: "string",
        defaultValue: "13",
      },
      roleName: {
        type: "string",
        defaultValue: "User",
      },
      features: {
        type: "array",
        defaultValue: [],
      },
      privileges: {
        type: "object",
        defaultValue: {
          RecordofRotationsReport: ["view"],
          SubmitProcedures: ["view", "create", "update", "delete"],
        },
      },
    },
    providesData: true,
  });

  plasmic.registerComponent(OnBeforeLogoutProvider, {
    name: "OnBeforeLogoutProvider",
    description: "Run code whenever logout is triggered.",
    importPath:
      modulePath +
      "/code-components/AuthContext/LogoutProvider/OnBeforeLogoutProvider",
    props: {
      onBeforeLogout: {
        type: "eventHandler",
        argTypes: [{ name: "event", type: "object" }],
      },
    },
    styleSections: false,
  });
}
