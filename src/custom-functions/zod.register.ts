import type { PlasmicLoader } from "../plasmic";
import { zod } from "./zod";

export function registerZod(
  plasmic: PlasmicLoader,
  modulePath = "@fullstackhouse/plasmic-utils/dist",
) {
  plasmic.registerFunction(zod, {
    name: "zod",
    description: "Get zod object. Example usage: $$.zod().string()",
    importPath: modulePath + "/custom-functions/zod",
    typescriptDeclaration: `(): any`,
  });
}
