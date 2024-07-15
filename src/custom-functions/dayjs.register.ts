import { PlasmicComponentLoader } from "@plasmicapp/loader-react";
import { dayjs } from "./dayjs";

export function registerDayjs(
  plasmic: PlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils",
) {
  plasmic.registerFunction(dayjs, {
    name: "dayjs",
    importPath: modulePath + "/src/custom-functions/dayjs",
    typescriptDeclaration: `(date?: any, format?: any, locale?: string, strict?: boolean): any`,
  });
}
