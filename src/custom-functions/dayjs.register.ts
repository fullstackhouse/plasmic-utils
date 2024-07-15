import type { PlasmicLoader } from "../plasmic";
import { dayjs } from "./dayjs";

export function registerDayjs(
  plasmic: PlasmicLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
) {
  plasmic.registerFunction(dayjs, {
    name: "dayjs",
    importPath: modulePath + "/custom-functions/dayjs",
    typescriptDeclaration: `(date?: any, format?: any, locale?: string, strict?: boolean): any`,
  });
}
