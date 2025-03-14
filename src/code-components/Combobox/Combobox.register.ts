import type { PlasmicLoader } from "../../plasmic";
import { Combobox } from "./Combobox";

export function registerCombobox(
  plasmic: PlasmicLoader,
  modulePath = "@fullstackhouse/plasmic-utils/dist",
) {
  const activeSelector = "[data-headlessui-state*=active]";
  const selectedSelector = "[aria-selected=true]";
  const highlightSelector = "[data-highlight=true]";

  plasmic.registerComponent(Combobox, {
    name: "RawCombobox",
    importName: "Combobox",
    importPath: modulePath + "/code-components/Combobox/Combobox",
    props: {
      value: {
        type: "string",
        editOnly: true,
      },
      emptyOptionText: { type: "string", defaultValue: "Nothing found." },
      typeToSearchText: {
        type: "string",
        defaultValue:
          "Displaying the first 500 results, start typing to filter...",
      },
      options: {
        type: "array",
        defaultValue: [
          {
            label: "Option 1",
            value: "opt1",
          },
          {
            label: "Option 2, Highlighted",
            value: "opt2",
            highlight: true,
          },
          {
            label: "Option 3",
            value: "opt3",
          },
          {
            label: "Option 11",
            value: "opt11",
          },
        ],
      },
      disabled: { type: "boolean", defaultValue: false },
      "aria-label": "string",
      "aria-labelledby": "string",
      placeholder: { type: "string", defaultValue: "Select" },
      leftIcon: { type: "slot" },
      rightIcon: { type: "slot" },
      footer: { type: "slot" },
      inputWrapperClassName: {
        type: "class",
        selectors: [
          {
            selector: ":hover",
            label: "Hover",
          },
          {
            selector: ":focus-within",
            label: "Focus Within",
          },
        ],
      },
      inputClassName: {
        type: "class",
        selectors: [
          {
            selector: "::placeholder",
            label: "Placeholder",
          },
        ],
      },
      leftIconClassName: { type: "class" },
      rightIconClassName: { type: "class" },
      labelClassName: { type: "class" },
      typeToSearchClassName: { type: "class" },
      searchValueClassName: { type: "class" },
      descriptionClassName: {
        type: "class",
        selectors: [
          {
            label: "Highlighted",
            selector: highlightSelector,
          },
        ],
      },
      emptyOptionClassName: { type: "class" },
      groupClassName: { type: "class" },
      arrowIconClassName: {
        type: "class",
      },
      optionsClassName: { type: "class" },
      optionClassName: {
        type: "class",
        selectors: [
          {
            label: "Active",
            selector: activeSelector,
          },
          {
            label: "Selected",
            selector: selectedSelector,
          },
          {
            label: "Highlighted",
            selector: highlightSelector,
          },
          {
            label: "Active & Selected",
            selector: `${activeSelector}${selectedSelector}`,
          },
          {
            label: "Active & Highlighted",
            selector: `${activeSelector}${highlightSelector}`,
          },
          {
            label: "Selected & Highlighted",
            selector: `${selectedSelector}${highlightSelector}`,
          },
          {
            label: "Active & Selected & Highlighted",
            selector: `${activeSelector}${selectedSelector}${highlightSelector}`,
          },
        ],
      },
      onChange: {
        type: "eventHandler",
        argTypes: [
          {
            name: "val",
            type: "string",
          },
        ],
      },
    },
    states: {
      value: {
        type: "writable",
        variableType: "text",
        valueProp: "value",
        onChangeProp: "onChange",
      },
    },
  });
}
