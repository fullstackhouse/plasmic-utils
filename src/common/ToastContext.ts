export interface ToastContext {
  show(toast: {
    id?: string;
    type?: "info" | "error" | "success";
    title: string;
    description?: string;
    duration?: number;
  }): void;

  hide(toastId: string | number): void;
}
