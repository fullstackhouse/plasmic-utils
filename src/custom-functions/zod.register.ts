import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { zod } from "./zod";

export function registerZod(
  plasmic: NextJsPlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils",
) {
  plasmic.registerFunction(zod, {
    name: "zod",
    description: "Get zod object. Example usage: $$.zod().string()",
    importPath: modulePath + "/src/custom-functions/zod",
    typescriptDeclaration: `(): any`,
  });
}
