import type { PlasmicLoader } from "../plasmic";
import { parseDateWithoutTimeZone } from "./parseDateWithoutTimeZone";

export function registerParseDateWithoutTimeZone(
  plasmic: PlasmicLoader,
  modulePath = "@fullstackhouse/plasmic-utils/dist",
) {
  plasmic.registerFunction(parseDateWithoutTimeZone, {
    name: "parseDateWithoutTimeZone",
    description: "Same as new Date(...), but avoids converting time zone.",
    importPath: modulePath + "/custom-functions/parseDateWithoutTimeZone",
    typescriptDeclaration: `(datetime: string): Date`,
  });
}
