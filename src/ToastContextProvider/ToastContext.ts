import { createContext } from "react";

export type ToastType = "info" | "error" | "success" | "warning";

export interface ToastService {
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

export const ToastContext = createContext<ToastService | null>(null);
