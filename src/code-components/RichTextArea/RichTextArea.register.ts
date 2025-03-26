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
        description: "Contents of the editor"
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
            type: "object"
          },
          {
            name: "source",
            type: "string"
          },
        ]
      }
    },
  });
}
