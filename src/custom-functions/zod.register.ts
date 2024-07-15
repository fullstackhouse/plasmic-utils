import { PlasmicComponentLoader } from "@plasmicapp/loader-react";
import { zod } from "./zod";

export function registerZod(
  plasmic: PlasmicComponentLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
) {
  plasmic.registerFunction(zod, {
    name: "zod",
    description: "Get zod object. Example usage: $$.zod().string()",
    importPath: modulePath + "/custom-functions/zod",
    typescriptDeclaration: `(): any`,
  });
}
