import { PlasmicLoader } from "../plasmic";
import { ToastContextProvider } from "./ToastContextProvider";

export function registerToastContextProvider(
  plasmic: PlasmicLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
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
    },
    providesData: true,
    globalActions: {
      show: {
        description: `Example usage: show({ type: 'info', title: 'Title', description: 'Description, actionLabel: 'Action', actionUrl: 'actionUrl', actionVariant: 'secondary' }) .
          Interface: { id?: string, type?: 'info' | 'success' | 'error', title: string, description?: string, actionLabel?: string, actionUrl?: string, actionVariant?: string, duration?: number }`,
        parameters: [{ name: "toast", type: "object" }],
      },
      hide: {
        parameters: [{ name: "toastId", type: "string" }],
      },
    },
  });
}
