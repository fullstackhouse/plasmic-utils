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
      deps: {
        type: "array",
        description:
          "Children will be updated only when any of the dependencies change",
      },
      children: {
        type: "slot",
      },
    },
    styleSections: false,
    isAttachment: true,
  });
}
