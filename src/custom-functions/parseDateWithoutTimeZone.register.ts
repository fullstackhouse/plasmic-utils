import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { parseDateWithoutTimeZone } from "./parseDateWithoutTimeZone";

export function registerParseDateWithoutTimeZone(
  plasmic: NextJsPlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils",
) {
  plasmic.registerFunction(parseDateWithoutTimeZone, {
    name: "parseDateWithoutTimeZone",
    description: "Same as new Date(...), but avoids converting time zone.",
    importPath: modulePath + "/src/custom-functions/parseDateWithoutTimeZone",
    typescriptDeclaration: `(datetime: string): Date`,
  });
}
