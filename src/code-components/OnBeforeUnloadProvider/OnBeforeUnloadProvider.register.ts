import type { PlasmicLoader } from "../../plasmic";
import { OnBeforeUnloadProvider } from "./OnBeforeUnloadProvider";

export function registerOnBeforeUnloadProvider(
  plasmic: PlasmicLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
) {
  plasmic.registerComponent(OnBeforeUnloadProvider, {
    name: "OnBeforeUnloadProvider",
    description:
      "Open confirm window whenever the page is about to be unloaded while page has unsaved changes.",
    importPath:
      modulePath +
      "/src/code-components/OnBeforeUnloadProvider/OnBeforeUnloadProvider",
    props: {
      hasUnsavedChanges: {
        type: "boolean",
        defaultValue: false,
      },
    },
    styleSections: false,
  });
}
