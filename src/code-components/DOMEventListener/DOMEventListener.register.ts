import type { PlasmicLoader } from "../../plasmic";
import { FunctionComponent } from "react";
import { DOMEventListener } from "./DOMEventListener";

export function registerDOMEventListener(
  plasmic: PlasmicLoader,
  modulePath = "@fullstackhouse/plasmic-utils/dist",
) {
  plasmic.registerComponent(DOMEventListener as FunctionComponent<any>, {
    name: "DOMEventListener",
    description: "Listens for events on the DOMElement or the window object.",
    importPath:
      modulePath + "/code-components/DOMEventListener/DOMEventListener",
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
      elementId: {
        type: "string",
        description:
          "Element's id on which you want to set the EventListener. None = window",
      },
    },
    styleSections: false,
  });
}
