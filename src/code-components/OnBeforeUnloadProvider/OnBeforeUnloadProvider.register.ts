import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { OnBeforeUnloadProvider } from "./OnBeforeUnloadProvider";

export function registerOnBeforeUnloadProvider(
  plasmic: NextJsPlasmicComponentLoader,
) {
  plasmic.registerComponent(OnBeforeUnloadProvider, {
    name: "OnBeforeUnloadProvider",
    description:
      "Open confirm window whenever the page is about to be unloaded while page has unsaved changes.",
    importPath:
      "./src/code-components/OnBeforeUnloadProvider/OnBeforeUnloadProvider",
    props: {
      hasUnsavedChanges: {
        type: "boolean",
        defaultValue: false,
      },
    },
    styleSections: false,
  });
}
