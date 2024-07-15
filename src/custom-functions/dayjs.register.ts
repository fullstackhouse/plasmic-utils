import { PlasmicComponentLoader } from "@plasmicapp/loader-react";
import { dayjs } from "./dayjs";

export function registerDayjs(
  plasmic: PlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils/dist",
) {
  plasmic.registerFunction(dayjs, {
    name: "dayjs",
    importPath: modulePath + "/custom-functions/dayjs",
    typescriptDeclaration: `(date?: any, format?: any, locale?: string, strict?: boolean): any`,
  });
}
