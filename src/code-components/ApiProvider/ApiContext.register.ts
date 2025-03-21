import type { PlasmicLoader } from "../../plasmic";
import { ApiContextProvider } from "./ApiContext";

export function registerApiContextProvider(
  plasmic: PlasmicLoader,
  modulePath = "@fullstackhouse/plasmic-utils/dist",
) {
  plasmic.registerGlobalContext(ApiContextProvider, {
    name: "ApiContext",
    importPath: modulePath + "/code-components/ApiProvider/ApiContext",
    importName: "ApiContextProvider",
    props: {
      middlewares: { type: "array" },
    },
  });
}
