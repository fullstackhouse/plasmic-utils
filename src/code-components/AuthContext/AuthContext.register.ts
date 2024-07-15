import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { AuthContextProvider } from "./AuthContextProvider";

export function registerAuthContext(plasmic: NextJsPlasmicComponentLoader) {
  plasmic.registerGlobalContext(AuthContextProvider, {
    name: "AuthContext",
    importPath: "./src/code-components/AuthContext/AuthContextProvider",
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
}
