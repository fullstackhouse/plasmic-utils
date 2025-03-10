import type { PlasmicLoader } from "../../plasmic";
import { DeferredValue } from "./DeferredValue";

export function registerDeferredValue(
  plasmic: PlasmicLoader,
  modulePath = "@fullstackhouse/plasmic-utils/dist",
) {
  plasmic.registerComponent(DeferredValue, {
    name: "DeferredValue",
    description: "Defers a value, allowing for a partial but faster render.",
    importPath: modulePath + "/code-components/DeferredValue/DeferredValue",
    props: {
      name: {
        type: "string",
        defaultValue: "deferredValue",
      },
      value: {
        type: "string",
      },
      children: "slot",
    },
    providesData: true,
    isAttachment: true,
  });
}
