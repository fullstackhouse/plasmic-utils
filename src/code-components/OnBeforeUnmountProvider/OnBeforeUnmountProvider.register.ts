import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { OnBeforeUnmountProvider } from "./OnBeforeUnmountProvider";

export function registerOnBeforeUnmountProvider(
  plasmic: NextJsPlasmicComponentLoader
) {
  plasmic.registerComponent(OnBeforeUnmountProvider, {
    name: "OnBeforeUnmountProvider",
    description: "Calls the passed callback before unmounting the component",
    importPath:
      "./src/code-components/OnBeforeUnmountProvider/OnBeforeUnmountProvider",
    props: {
      callback: {
        type: "eventHandler",
        argTypes: [],
      },
    },
    styleSections: false,
  });
}
