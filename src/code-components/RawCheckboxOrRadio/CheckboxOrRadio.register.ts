import type { PlasmicLoader } from "../../plasmic";
import { RawCheckboxOrRadio } from "./CheckboxOrRadio";

export function registerRawCheckboxOrRadio(
  plasmic: PlasmicLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
) {
  plasmic.registerComponent(RawCheckboxOrRadio, {
    name: "RawCheckboxOrRadio",
    importPath:
      modulePath + "/code-components/RawCheckboxOrRadio/CheckboxOrRadio",
    props: {
      type: {
        type: "choice",
        options: ["checkbox", "radio"],
        defaultValue: "checkbox",
      },
      name: "string",
      value: "string",
      checked: "boolean",
      disabled: "boolean",
      onChange: {
        type: "eventHandler",
        argTypes: [{ name: "event", type: "object" }],
      },
      onFocus: {
        type: "eventHandler",
        argTypes: [{ name: "event", type: "object" }],
      },
      onBlur: {
        type: "eventHandler",
        argTypes: [{ name: "event", type: "object" }],
      },
      "aria-label": { type: "string", advanced: true },
      "aria-labelledby": { type: "string", advanced: true },
      children: "slot",
    },
  });
}
