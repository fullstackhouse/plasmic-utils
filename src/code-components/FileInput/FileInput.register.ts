import type { PlasmicLoader } from "../../plasmic";
import { FileInput } from "./FileInput";

export const FILE_TYPES = {
  any: [],
  images: ["image/*"],
  videos: ["video/*"],
  documents: [
    ".pdf",
    ".doc",
    ".docx",
    ".xml",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".txt",
    ".odt",
    "application/msword",
  ],
};

export function registerFileInput(
  plasmic: PlasmicLoader,
  modulePath = "@fullstackhouse/plasmic-utils/dist",
) {
  plasmic.registerComponent(FileInput, {
    name: "FileInput",
    importPath: modulePath + "/code-components/FileInput/FileInput",
    props: {
      onChange: {
        type: "eventHandler",
        advanced: true,
        argTypes: [
          {
            name: "file",
            type: "object",
          },
        ],
      },
      types: {
        displayName: "Acceptable File Types",
        type: "choice",
        multiSelect: true,
        options: Object.keys(FILE_TYPES),
        defaultValue: ["any"],
      },
      customTypes: {
        type: "array",
        advanced: true,
        description: "Acceptable file types",
        helpText:
          "More here: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file",
      },
      children: "slot",
    },
  });
}
