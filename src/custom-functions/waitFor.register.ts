import type { PlasmicLoader } from "../plasmic";
import { waitFor } from "./waitFor";

export function registerWaitFor(
  plasmic: PlasmicLoader,
  modulePath = "@fullstackhouse/plasmic-utils/dist",
) {
  plasmic.registerFunction(waitFor, {
    name: "waitFor",
    description:
      "Return a promise that will be resolved once a callback returns a truthy value. Example usage: $$.waitFor(() => !document.querySelector('#alert'), { timeout: 300, pollInterval: 50 })",
    importPath: modulePath + "/custom-functions/waitFor",
    typescriptDeclaration: `(
  callback: () => boolean,
  options?: {
    timeout?: number;
    pollInterval?: number;
  }
): Promise<void>`,
  });
}
