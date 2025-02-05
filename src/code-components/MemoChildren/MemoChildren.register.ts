import type { PlasmicLoader } from "../../plasmic";
import { MemoChildren } from "./MemoChildren";

export function registerMemoChildren(
  plasmic: PlasmicLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
) {
  plasmic.registerComponent(MemoChildren, {
    name: "MemoChildren",
    description: "Renders children wrapped in `React.useMemo`.",
    importPath: modulePath + "/code-components/MemoChildren/MemoChildren",
    props: {
      memoKey: {
        type: "string",
        description: "Children will be updated only when this key changes",
        helpText: "Can be a single item or an array of items.",
      },
      children: {
        type: "slot",
      },
    },
    styleSections: false,
  });
}
