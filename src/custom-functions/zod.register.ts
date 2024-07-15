import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { zod } from "./zod";

export function registerZod(plasmic: NextJsPlasmicComponentLoader) {
  plasmic.registerFunction(zod, {
    name: "zod",
    description: "Get zod object. Example usage: $$.zod().string()",
    importPath: "./src/custom-functions/zod",
    typescriptDeclaration: `(): any`,
  });
}
