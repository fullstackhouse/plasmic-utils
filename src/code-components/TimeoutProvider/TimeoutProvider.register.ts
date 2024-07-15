import { PlasmicComponentLoader } from "@plasmicapp/loader-react";
import { TimeoutProvider } from "./TimeoutProvider";

export function registerTimeoutProvider(
  plasmic: PlasmicComponentLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
) {
  plasmic.registerComponent(TimeoutProvider, {
    name: "TimeoutProvider",
    description: "Run code whenever some time is reached.",
    importPath: modulePath + "/code-components/TimeoutProvider/TimeoutProvider",
    props: {
      delay: {
        type: "number",
        defaultValue: 1000,
        description: "In miliseconds. Set to null to disable.",
      },
      repeat: {
        type: "boolean",
        defaultValue: false,
        description:
          "If true, onTimeout callback will be called repeatedly after every `delay`.",
      },
      leadingRepeat: {
        type: "boolean",
        defaultValue: false,
        description:
          "If true and repeat is also true, onTimeout callback will be called when timer is start (not just after the consecutive delay).",
      },
      onTimerStart: {
        type: "eventHandler",
        description:
          "Called whenever timer starts to count towards the timeout.",
        argTypes: [
          {
            name: "delay",
            type: "number",
          },
        ],
      },
      onTimeout: {
        type: "eventHandler",
        description: "Called whenever timer reaches the delay.",
        argTypes: [],
      },
    },
    refActions: {
      reset: {
        description: "Reset the timer",
        argTypes: [],
      },
    },
    styleSections: false,
  });
}
