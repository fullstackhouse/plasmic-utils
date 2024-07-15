import { PlasmicComponentLoader } from "@plasmicapp/loader-react";
import { TextLinkOrButton } from "./TextLinkOrButton";

export function registerTextLinkOrButton(
  plasmic: PlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils",
) {
  plasmic.registerComponent(TextLinkOrButton, {
    name: "TextLinkOrButton",
    importPath:
      modulePath + "/src/code-components/TextLinkOrButton/TextLinkOrButton",
    props: {
      href: "href",
      disabled: {
        type: "boolean",
        defaultValue: false,
      },
      style: { type: "object", advanced: true },
      className: {
        type: "class",
        selectors: [
          {
            selector: ":hover",
            label: "Hover",
          },
          {
            selector: ":not(:hover)",
            label: "Hover",
          },
          {
            selector: ":active",
            label: "Pressed",
          },
          {
            selector: ":not(:active)",
            label: "Not Pressed",
          },
        ],
      },
      themeResetClass: {
        type: "themeResetClass",
        targetAllTags: true,
      },
      onClick: {
        type: "eventHandler",
        argTypes: [{ name: "event", type: "object" }],
      },
      children: {
        type: "slot",
        defaultValue: "Link text",
        mergeWithParent: true,
      },
    },
    styleSections: [
      "typography",
      "sizing",
      "spacing",
      "background",
      "transform",
      "transitions",
      "layout",
      "overflow",
      "border",
      "shadows",
      "visibility",
    ],
  });
}
