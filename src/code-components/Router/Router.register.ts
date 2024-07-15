import { PlasmicComponentLoader } from "@plasmicapp/loader-react";
import { Router } from "./Router";

export function registerRouter(
  plasmic: PlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils/dist",
) {
  plasmic.registerGlobalContext(Router, {
    name: "Router",
    importPath: modulePath + "/code-components/Router/Router",
    props: {
      initialQueryString: {
        type: "string",
        description:
          "Effective only when the initial query can't be inferred. This may happen on server-side render or inside of the Plasmic editor.",
      },
    },
    providesData: true,
    globalActions: {
      setQuery: {
        description: `Example usage: setQuery({ active: 'true' }, { merge: true, push: true }) .
        Merge option (by default true) says whether given query should be merged with the current one.
        Push option (by default false) says whether the query should be passed as a new route. (Enabling browser back button to go back to the previous query.)`,
        parameters: [
          { name: "query", type: "object" },
          { name: "options", type: "object" },
        ],
      },
    },
  });
}
