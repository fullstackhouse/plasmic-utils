import { PlasmicComponentLoader } from "@plasmicapp/loader-react";
import { OnBeforeUnmountProvider } from "./OnBeforeUnmountProvider";

export function registerOnBeforeUnmountProvider(
  plasmic: PlasmicComponentLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
) {
  plasmic.registerComponent(OnBeforeUnmountProvider, {
    name: "OnBeforeUnmountProvider",
    description: "Calls the passed callback before unmounting the component",
    importPath:
      modulePath +
      "/src/code-components/OnBeforeUnmountProvider/OnBeforeUnmountProvider",
    props: {
      callback: {
        type: "eventHandler",
        argTypes: [],
      },
    },
    styleSections: false,
  });
}
