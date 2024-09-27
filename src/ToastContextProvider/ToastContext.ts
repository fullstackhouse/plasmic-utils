export type ToastType = "info" | "error" | "success";

export interface ToastContext {
  show(toast: {
    id?: string;
    type?: ToastType;
    title: string;
    description?: string;
    action?: {
      variant?: string;
      label: string;
      onClick(): void;
    };
    duration?: number;
  }): void;

  hide(toastId: string | number): void;
}
