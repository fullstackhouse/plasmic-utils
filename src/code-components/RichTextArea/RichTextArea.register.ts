import type { PlasmicLoader } from "../../plasmic";
import { componentHelpers } from "./componentHelpers";
import { RichTextArea } from "./RichTextArea";
import {
  COLOR_TYPE_DICT,
  FONT_SIZES,
  FORMATTING_TYPES_DICT,
  HEADING_TYPES_DICT,
  INPUT_TYPES,
  TEXT_STYLE_DICT,
  ToolbarOptionsType,
} from "./toolbar";
import { PropType } from "@plasmicapp/host";

const toolbarFields: Record<ToolbarOptionsType, PropType<any>> = {
  textStyle: {
    type: "choice",
    multiSelect: true,
    options: Object.keys(TEXT_STYLE_DICT),
    defaultValue: Object.keys(TEXT_STYLE_DICT),
  },
  colors: {
    type: "choice",
    multiSelect: true,
    options: Object.keys(COLOR_TYPE_DICT),
    defaultValue: Object.keys(COLOR_TYPE_DICT),
  },
  script: {
    displayName: "Super/Sub Script",
    type: "boolean",
    defaultValue: true,
  },
  fontFamily: {
    type: "boolean",
    defaultValue: true,
  },
  heading: {
    type: "choice",
    multiSelect: true,
    options: Object.keys(HEADING_TYPES_DICT),
    defaultValue: Object.keys(HEADING_TYPES_DICT),
  },
  fontSizes: {
    type: "choice",
    multiSelect: true,
    options: FONT_SIZES,
    defaultValue: FONT_SIZES,
  },
  formatting: {
    type: "choice",
    multiSelect: true,
    options: Object.keys(FORMATTING_TYPES_DICT),
    defaultValue: Object.keys(FORMATTING_TYPES_DICT),
  },
  inputTypes: {
    type: "choice",
    multiSelect: true,
    options: INPUT_TYPES,
    defaultValue: INPUT_TYPES,
  },
} as const;

export function registerRichTextArea(
  plasmic: PlasmicLoader,
  modulePath = "@fullstackhouse/plasmic-utils/dist",
) {
  plasmic.registerComponent(RichTextArea, {
    name: "RichTextArea",
    importPath: modulePath + "/code-components/RichTextArea/RichTextArea",
    defaultStyles: {
      width: "stretch",
    },
    props: {
      value: {
        type: "string",
        displayName: "HTML Value",
        editOnly: true,
        uncontrolledProp: "defaultValue",
        description: "Contents of the editor",
      },
      placeholder: "string",
      toolbar: {
        type: "object",
        fields: { ...toolbarFields },
        defaultValue: Object.keys(toolbarFields).reduce((acc: any, key) => {
          acc[key] = (
            toolbarFields[key as keyof typeof toolbarFields] as any
          ).defaultValue;
          return acc;
        }, {}),
        description: "Customize the toolbar to show/hide controls",
      },
      customToolbar: {
        type: "array",
        advanced: true,
        description:
          "Custom toolbar configuration for Quill editor. Overrides the existing toolbar.",
        helpText:
          "Check toolbarOptions here: https://quilljs.com/docs/modules/toolbar",
      },
      readOnly: {
        type: "boolean",
        description: "Prevents user from changing the contents of the editor",
        defaultValue: false,
        advanced: true,
      },
      onChange: {
        type: "eventHandler",
        advanced: true,
        argTypes: [
          {
            name: "content",
            type: "string",
          },
          {
            name: "delta",
            type: "object",
          },
          {
            name: "source",
            type: "string",
          },
          {
            name: "editor",
            type: "object",
          },
        ],
      },
      onChangeSelection: {
        type: "eventHandler",
        advanced: true,
        argTypes: [
          {
            name: "range",
            type: "object",
          },
          {
            name: "source",
            type: "string",
          },
          {
            name: "editor",
            type: "object",
          },
        ],
      },
      onFocus: {
        type: "eventHandler",
        advanced: true,
        argTypes: [
          {
            name: "range",
            type: "object",
          },
          {
            name: "source",
            type: "string",
          },
          {
            name: "editor",
            type: "object",
          },
        ],
      },
      onBlur: {
        type: "eventHandler",
        advanced: true,
        argTypes: [
          {
            name: "previousRange",
            type: "object",
          },
          {
            name: "source",
            type: "string",
          },
          {
            name: "editor",
            type: "object",
          },
        ],
      },
      onKeyPress: {
        type: "eventHandler",
        advanced: true,
        argTypes: [
          {
            name: "event",
            type: "object",
          },
        ],
      },
      onKeyDown: {
        type: "eventHandler",
        advanced: true,
        argTypes: [
          {
            name: "event",
            type: "object",
          },
        ],
      },
      onKeyUp: {
        type: "eventHandler",
        advanced: true,
        argTypes: [
          {
            name: "event",
            type: "object",
          },
        ],
      },
      onImageUpload: {
        type: "object",
        advanced: true,
      },
      onImageUploadError: {
        type: "eventHandler",
        advanced: true,
        argTypes: [
          {
            name: "error",
            type: "object",
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
        ...componentHelpers.states.value,
      },
    },
    componentHelpers: {
      helpers: componentHelpers,
      importName: "componentHelpers",
      importPath: modulePath + "/code-components/RichTextArea/componentHelpers",
    },
  });
}
