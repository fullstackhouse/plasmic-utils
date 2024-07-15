import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { WindowEventListener } from "./WindowEventListener";
import { FunctionComponent } from "react";

export function registerWindowEventListener(
  plasmic: NextJsPlasmicComponentLoader,
) {
  plasmic.registerComponent(WindowEventListener as FunctionComponent<any>, {
    name: "WindowEventListener",
    description: "Listens for events on the window.",
    importPath: "./src/code-components/WindowEventListener/WindowEventListener",
    props: {
      onEvent: {
        type: "eventHandler",
        description: "Function to run when the event is triggered.",
        argTypes: [{ name: "event", type: "object" }],
      },
      eventType: {
        type: "string",
        defaultValue: "scroll",
        description: "Type of event to listen for i.e. 'scroll', 'click` etc.",
      },
      passive: {
        type: "boolean",
        defaultValue: false,
        description: "Whether the event listener is passive.",
      },
    },
    styleSections: false,
  });
}
