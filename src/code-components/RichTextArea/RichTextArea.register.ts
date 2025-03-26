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
    },
  });
}
