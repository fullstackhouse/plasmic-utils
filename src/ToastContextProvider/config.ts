import { DefaultToastRenderer } from "./ToastRenderer";

/**
 * Mutate this config before the app is rendered
 * to replace the default toast renderer.
 */
export const toastContextProviderConfig = {
  toastRenderer: DefaultToastRenderer,
};
