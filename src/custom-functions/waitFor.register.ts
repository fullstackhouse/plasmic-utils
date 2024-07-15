import { PlasmicComponentLoader } from "@plasmicapp/loader-react";
import { waitFor } from "./waitFor";

export function registerWaitFor(
  plasmic: PlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils",
) {
  plasmic.registerFunction(waitFor, {
    name: "waitFor",
    description:
      "Return a promise that will be resolved once a callback returns a truthy value. Example usage: $$.waitFor(() => !document.querySelector('#alert'), { timeout: 300, pollInterval: 50 })",
    importPath: modulePath + "/src/custom-functions/waitFor",
    typescriptDeclaration: `(
  callback: () => boolean,
  options?: {
    timeout?: number;
    pollInterval?: number;
  }
): Promise<void>`,
  });
}
