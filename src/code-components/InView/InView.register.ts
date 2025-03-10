import type { PlasmicLoader } from "../../plasmic";
import { InView } from "./InView";

export function registerInView(
  plasmic: PlasmicLoader,
  modulePath = "@fullstackhouse/plasmic-utils/dist",
) {
  plasmic.registerComponent(InView, {
    name: "InView",
    description:
      "Mounts InView to listen whether element is in the client's viewport.",
    importPath: modulePath + "/code-components/InView/InView",
    props: {
      style: { type: "object", advanced: true },
      previewFallback: {
        type: "boolean",
        defaultValue: false,
      },
      root: {
        type: "object",
        description:
          "The IntersectionObserver interface's read-only `root` property identifies the Element or Document whose bounds are treated as the bounding box of the viewport for the element which is the observer's target. If the `root` is null, then the bounds of the actual document viewport are used.",
        advanced: true,
      },
      rootMargin: {
        type: "string",
        description:
          "Margin around the root. Can have values similar to the CSS margin property, e.g. `10px 20px 30px 40px` (top, right, bottom, left).",
        advanced: true,
      },
      threshold: {
        type: "number",
        description:
          "Number between `0` and `1` indicating the percentage that should be visible before triggering. Can also be an `array` of numbers, to create multiple trigger points.",
        advanced: true,
      },
      triggerOnce: {
        type: "boolean",
        defaultValue: false,
        description: "Only trigger the inView callback once",
      },
      initialInView: {
        type: "boolean",
        defaultValue: false,
        description:
          "Set the initial value of the `inView` boolean. This can be used if you expect the element to be in the viewport to start with, and you want to trigger something when it leaves.",
        advanced: true,
      },
      fallbackInView: {
        type: "boolean",
        defaultValue: true,
        description:
          "Fallback to this inView state if the IntersectionObserver is unsupported, and a polyfill wasn't loaded",
        advanced: true,
      },
      onChange: {
        type: "eventHandler",
        argTypes: [
          { name: "inView", type: "boolean" },
          { name: "entry", type: "object" },
        ],
        description: "Call this function whenever the in view state changes",
      },
      fallback: {
        type: "slot",
      },
      children: {
        type: "slot",
      },
    },
    isAttachment: true,
  });
}
