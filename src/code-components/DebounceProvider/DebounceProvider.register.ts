import { PlasmicComponentLoader } from "@plasmicapp/loader-react";
import { DebounceProvider } from "./DebounceProvider";

export function registerDebounceProvider(
  plasmic: PlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils/dist",
) {
  plasmic.registerComponent(DebounceProvider, {
    name: "DebounceProvider",
    description: "Passes through a value into the context, but after a delay.",
    importPath:
      modulePath + "/code-components/DebounceProvider/DebounceProvider",
    props: {
      name: {
        type: "string",
        defaultValue: "debouncedValue",
      },
      value: {
        type: "object",
      },
      delay: {
        type: "number",
        defaultValue: 300,
      },
      options: {
        type: "object",
        helpText:
          "See options of useDebounce hook in use-debounce npm package.",
      },
      children: "slot",
    },
    providesData: true,
    isAttachment: true,
  });
}
