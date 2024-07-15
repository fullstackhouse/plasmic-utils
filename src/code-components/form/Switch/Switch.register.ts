import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { Switch } from "./Switch";

export function registerSwitch(
  plasmic: NextJsPlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils",
) {
  plasmic.registerComponent(Switch, {
    name: "RawSwitch",
    importName: "Switch",
    importPath: modulePath + "/src/code-components/form/Switch/Switch",
    props: {
      name: { type: "string", advanced: true },
      value: { type: "string", advanced: true },
      checked: {
        type: "boolean",
        defaultValue: false,
        editOnly: true,
        uncontrolledProp: "defaultChecked",
      },
      disabled: {
        type: "boolean",
        defaultValue: false,
      },
      rootClassName: {
        type: "class",
        selectors: [
          {
            selector: ":focus",
            label: "Focus",
          },
          {
            selector: ":focus-visible",
            label: "Focus Visible",
          },
          {
            selector: "[data-state='checked']",
            label: "Checked",
          },
          {
            selector: ":disabled",
            label: "Disabled",
          },
        ],
      },
      thumbClassName: {
        type: "class",
        selectors: [
          {
            selector: "[data-state='checked']",
            label: "Checked",
          },
        ],
      },
      onChange: {
        type: "eventHandler",
        argTypes: [
          {
            name: "val",
            type: "boolean",
          },
        ],
      },
      onBlur: {
        type: "eventHandler",
        argTypes: [],
      },
      onFocus: {
        type: "eventHandler",
        argTypes: [],
      },
      "aria-label": "string",
      "aria-labelledby": "string",
      children: "slot",
    },
    states: {
      checked: {
        type: "writable",
        valueProp: "checked",
        onChangeProp: "onChange",
        variableType: "boolean",
      },
    },
    styleSections: ["visibility", "sizing"],
  });
}
