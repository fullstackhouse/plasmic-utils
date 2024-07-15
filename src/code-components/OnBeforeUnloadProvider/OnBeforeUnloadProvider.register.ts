import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { OnBeforeUnloadProvider } from "./OnBeforeUnloadProvider";

export function registerOnBeforeUnloadProvider(
  plasmic: NextJsPlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils",
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
