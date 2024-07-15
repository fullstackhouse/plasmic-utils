import { PlasmicComponentLoader } from "@plasmicapp/loader-react";
import {
  DialogV2,
  DialogV2Close,
  DialogV2Description,
  DialogV2Title,
} from "./DialogV2";

export function registerDialogV2(
  plasmic: PlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils",
) {
  plasmic.registerComponent(DialogV2, {
    name: "DialogV2",
    importPath: modulePath + "/src/code-components/DialogV2/DialogV2",
    props: {
      open: {
        type: "boolean",
        defaultValue: true,
        editOnly: true,
        uncontrolledProp: "defaultOpen",
      },
      contentStyle: {
        type: "object",
        defaultValue: { width: "100%", maxWidth: 400 },
        advanced: true,
      },
      overlayClass: {
        type: "class",
        styleSections: ["background", "effects", "spacing"],
      },
      themeResetClass: { type: "themeResetClass" },
      zIndex: {
        type: "number",
        defaultValue: 10,
        advanced: true,
      },
      onOpenChange: {
        type: "eventHandler",
        argTypes: [
          {
            name: "open",
            type: "boolean",
          },
        ],
      },
      onPointerDownOutside: {
        type: "eventHandler",
        argTypes: [
          {
            name: "event",
            type: "object",
          },
        ],
        advanced: true,
      },
      children: {
        type: "slot",
        defaultValue: [
          {
            type: "vbox",
            styles: {
              width: "300px",
              background: "white",
              borderRadius: 4,
              margin: "40px 24px",
            },
            children: "dialog content",
          },
        ],
      },
    },
    states: {
      open: {
        type: "writable",
        valueProp: "open",
        onChangeProp: "onOpenChange",
        variableType: "boolean",
      },
    },
    styleSections: false,
  });

  plasmic.registerComponent(DialogV2Title, {
    name: "DialogV2Title",

    parentComponentName: "DialogV2",
    importPath: modulePath + "/src/code-components/DialogV2/DialogV2",
    props: {
      children: {
        type: "slot",
        mergeWithParent: true,
      },
    },
  });

  plasmic.registerComponent(DialogV2Description, {
    name: "DialogV2Description",
    parentComponentName: "DialogV2",
    importPath: modulePath + "/src/code-components/DialogV2/DialogV2",
    props: {
      children: {
        type: "slot",
        mergeWithParent: true,
      },
    },
  });

  plasmic.registerComponent(DialogV2Close, {
    name: "DialogV2Close",
    parentComponentName: "DialogV2",
    importPath: modulePath + "/src/code-components/DialogV2/DialogV2",
    props: {
      children: {
        type: "slot",
        mergeWithParent: true,
      },
    },
  });
}
