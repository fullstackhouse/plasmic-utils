import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { parseDateWithoutTimeZone } from "./parseDateWithoutTimeZone";

export function registerParseDateWithoutTimeZone(
  plasmic: NextJsPlasmicComponentLoader
) {
  plasmic.registerFunction(parseDateWithoutTimeZone, {
    name: "parseDateWithoutTimeZone",
    description: "Same as new Date(...), but avoids converting time zone.",
    importPath: "./src/custom-functions/parseDateWithoutTimeZone",
    typescriptDeclaration: `(datetime: string): Date`,
  });
}
