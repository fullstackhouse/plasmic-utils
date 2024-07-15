import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { dayjs } from "./dayjs";

export function registerDayjs(
  plasmic: NextJsPlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils",
) {
  plasmic.registerFunction(dayjs, {
    name: "dayjs",
    importPath: modulePath + "/src/custom-functions/dayjs",
    typescriptDeclaration: `(date?: any, format?: any, locale?: string, strict?: boolean): any`,
  });
}
