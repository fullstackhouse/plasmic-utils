import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { StateProvider } from "./StateProvider";

export function registerStateProvider(
  plasmic: NextJsPlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils",
) {
  plasmic.registerComponent(StateProvider, {
    name: "StateProvider",
    description:
      "Provides a state value, that will default to a certain value, whenever the current value is empty or is included in the provided list of allowed values.",
    importPath: modulePath + "/src/code-components/StateProvider/StateProvider",
    props: {
      value: {
        type: "string",
        editOnly: true,
        uncontrolledProp: "defaultValue",
        hidden: () => true,
      },
      defaultValue: {
        type: "string",
      },
      forceValue: {
        type: "string",
        description:
          "If defined, it will always be used as the current state value.",
        advanced: true,
      },
      allowedValues: {
        type: "array",
      },
      onChange: {
        type: "eventHandler",
        argTypes: [
          {
            name: "value",
            type: "string",
          },
        ],
      },
    },
    states: {
      value: {
        type: "writable",
        valueProp: "value",
        onChangeProp: "onChange",
        variableType: "text",
      },
    },
    styleSections: false,
  });
}
