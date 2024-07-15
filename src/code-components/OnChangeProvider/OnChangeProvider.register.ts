import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { OnChangeProvider } from "./OnChangeProvider";

export function registerOnChangeProvider(
  plasmic: NextJsPlasmicComponentLoader,
) {
  plasmic.registerComponent(OnChangeProvider, {
    name: "OnChangeProvider",
    description: "Run code whenever some data is changed.",
    importPath: "./src/code-components/OnChangeProvider/OnChangeProvider",
    props: {
      data: { type: "object" },
      runOnMount: {
        type: "boolean",
        defaultValue: true,
        advanced: true,
        description: "Run onChange when component is mounted.",
      },
      deepEqualCheck: {
        type: "boolean",
        defaultValue: true,
        advanced: true,
        description: "Perform deep equal check (instead of a shallow one).",
      },
      onChange: {
        type: "eventHandler",
        argTypes: [{ name: "data", type: "object" }],
      },
    },
    isAttachment: true,
    styleSections: false,
  });
}
