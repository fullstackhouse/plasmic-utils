import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { dayjs } from "./dayjs";

export function registerDayjs(plasmic: NextJsPlasmicComponentLoader) {
  plasmic.registerFunction(dayjs, {
    name: "dayjs",
    importPath: "./src/custom-functions/dayjs",
    typescriptDeclaration: `(date?: any, format?: any, locale?: string, strict?: boolean): any`,
  });
}
