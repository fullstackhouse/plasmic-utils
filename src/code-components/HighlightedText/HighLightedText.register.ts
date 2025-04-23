import type { PlasmicLoader } from "../../plasmic";
import { HighlightedText } from "./HighlightedText";

export function registerHighlightedText(
  plasmic: PlasmicLoader,
  modulePath = "@fullstackhouse/plasmic-utils/dist",
) {
  plasmic.registerComponent(HighlightedText, {
    name: "HighlightedText",
    description: "Highlights specified portions of text with custom styling",
    importPath: modulePath + "/code-components/HighlightedText/HighlightedText",
    props: {
      text: {
        type: "string",
        description: "The full text to be displayed",
      },
      highlight: {
        type: "string",
        description: "The substring to highlight (case insensitive)",
      },
      textClassName: {
        type: "class",
        description: "CSS class for the entire text",
      },
      highlightClassName: {
        type: "class",
        description: "CSS class for the highlighted portions",
      },
    },
  });
}
