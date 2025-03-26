import type { PlasmicLoader } from "../../plasmic";
import { RichTextArea } from "./RichTextArea";

export function registerRichTextArea(
  plasmic: PlasmicLoader,
  modulePath = "@fullstackhouse/plasmic-utils/dist",
) {
  plasmic.registerComponent(RichTextArea, {
    name: "RichTextArea",
    importPath: modulePath + "/code-components/RichTextArea/RichTextArea",
    props: {
      htmlValue: {
        type: "string",
        displayName: "HTML Value",
        description: "Contents of the editor",
      },
      toolbar: {
        type: "object",
        fields: {
          textStyle: {
            type: "choice",
            options: ["bold", "italic", "underline", "strikethrough"],
            multiSelect: true,
          },
          colors: {
            type: "choice",
            options: ["text color", "text background"],
            multiSelect: true,
          },
          superSubScript: {
            type: "boolean",
            defaultValue: true,
            displayName: "Super/SubScript",
          },
          fontFamily: {
            type: "boolean",
            defaultValue: true,
          },
          heading: {
            type: "choice",
            options: [
              "Heading 1",
              "Heading 2",
              "Heading 3",
              "Heading 4",
              "Heading 5",
              "Heading 6",
              "Body",
            ],
            multiSelect: true,
          },
          fontSizes: {
            type: "choice",
            options: ["small", "medium", "large", "huge"],
            multiSelect: true,
          },
          formatting: {
            type: "choice",
            options: [
              "alignment",
              "list",
              "indentation",
              "text direction",
              "clear formatting",
            ],
            multiSelect: true,
          },
          inputTypes: {
            type: "choice",
            options: [
              "link",
              "blockquote",
              "image",
              "video",
              "code-block",
              "formula",
            ],
            multiSelect: true,
          },
        },
        description: "Customize the toolbar to show/hide controls",
        helpText: "Custom toolbar need to be null for it to work.",
      },
      customToolbar: {
        type: "object",
        description:
          "Custom toolbar configuration for Quill editor. Overrides the existing toolbar.",
        helpText:
          "Check toolbarOptions here: https://quilljs.com/docs/modules/toolbar",
        advanced: true,
      },
      onChange: {
        type: "eventHandler",
        argTypes: [
          {
            name: "content",
            type: "string",
          },
          {
            name: "source",
            type: "string",
          },
        ],
      },
      onSelectionChange: {
        type: "eventHandler",
        argTypes: [
          {
            name: "range",
            type: "object",
          },
          {
            name: "source",
            type: "string",
          },
        ],
      },
      placeholder: {
        type: "string",
      },
      readOnly: {
        type: "boolean",
        defaultValue: false,
        description: "Prevents user from changing the contents of the editor",
      },
    },
  });
}
