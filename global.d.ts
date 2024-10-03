import { ToastContext } from "./src/ToastContextProvider/ToastContext";

declare global {
  interface Window {
    __myevalsPlasmicUtilsToast?: ToastContext;
  }
}
