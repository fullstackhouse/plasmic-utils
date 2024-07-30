import { PlasmicLoader } from "../plasmic";
import { ToastContextProvider } from "./ToastContextProvider";
import { ToastRenderer } from "./ToastRenderer";

export function registerToastContextProvider(
  plasmic: PlasmicLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
  toastRenderer?: ToastRenderer,
) {
  plasmic.registerGlobalContext(ToastContextProvider, {
    name: "ToastContext",
    importPath: modulePath + "/ToastContextProvider/ToastContextProvider",
    importName: "ToastContextProvider",
    props: {
      duration: {
        type: "number",
        defaultValue: 5000,
      },
      toastRenderer: {
        type: "object",
        defaultValue: toastRenderer,
      },
    },
    providesData: true,
    globalActions: {
      show: {
        description: `Example usage: show({ type: 'info', title: 'Title', description: 'Description' }) .
          Interface: { id?: string, type?: 'info' | 'success' | 'error', title: string, description?: string, duration?: number }`,
        parameters: [{ name: "toast", type: "object" }],
      },
      hide: {
        parameters: [{ name: "toastId", type: "string" }],
      },
    },
  });
}
