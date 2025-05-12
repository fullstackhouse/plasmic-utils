import type { PlasmicLoader } from "../../plasmic";
import { FileInput } from "./FileInput";

export const FILE_TYPES = {
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
            name: "files",
            type: "object",
          },
        ],
      },
      types: {
        displayName: "Acceptable File Types",
        type: "choice",
        multiSelect: true,
        options: Object.keys(FILE_TYPES),
        defaultValue: undefined,
      },
      multiple: "boolean",
      maxSize: {
        type: "number",
        defaultValue: 50 * 1024 * 1024,
        helpText: "Max file size in bytes",
        advanced: true,
      },
      children: "slot",
    },
  });
}
