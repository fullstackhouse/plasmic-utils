import { GlobalActionsProvider } from "@plasmicapp/react-web/lib/host";
import * as RadixToast from "@radix-ui/react-toast";
import {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MemoDataProvider } from "../code-components/MemoDataProvider/MemoDataProvider";
import { SentryContext } from "../sentry/SentryContext";
import { ToastContext, ToastService, ToastType } from "./ToastContext";
import styles from "./ToastContextProvider.module.css";
import { toastContextProviderConfig } from "./config";
import { useIsMounted } from "../common/useIsMounted";

export interface ToastContextProviderProps {
  duration: number;
  children: ReactNode;
}

interface ToastState {
  id: string | number;
  open: boolean;
  type?: ToastType;
  title: string;
  description?: string;
  action?: {
    variant?: string;
    label: string;
    onClick(): void;
  };
  duration?: number;
}

export function ToastContextProvider({
  duration,
  children,
}: ToastContextProviderProps) {
  const idRef = useRef(1);
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const sentry = useContext(SentryContext);
  const isMounted = useIsMounted();

  const service = useMemo<ToastService>(
    () => ({
      show({ id, type, title, description, action, duration }) {
        sentry?.addBreadcrumb({
          category: "toast",
          level: type === "success" ? "info" : type,
          message: [title, description].filter(Boolean).join("\n"),
        });

        setToasts((toasts) => [
          ...toasts.filter((t) => t.id !== id),
          {
            id: id ?? idRef.current++,
            open: true,
            type,
            title,
            description,
            action,
            duration,
          },
        ]);
      },

      hide(toastId: ToastState["id"]) {
        setToasts((toasts) =>
          toasts.map((toast) =>
            toast.id === toastId ? { ...toast, open: false } : toast,
          ),
        );
      },
    }),
    [sentry],
  );

  const ToastRenderer = toastContextProviderConfig.toastRenderer;

  return (
    <ToastContext.Provider value={service}>
      <GlobalActionsProvider
        contextName="ToastContext"
        actions={service as Record<keyof ToastService, Function>}
      >
        <MemoDataProvider name="toast" data={service} deps={[service]}>
          <RadixToast.Provider duration={duration}>
            {children}

            {toasts.map((toast) => (
              <RadixToast.Root
                style={{ userSelect: "auto" }}
                onSwipeEnd={(event) => event.preventDefault()}
                key={toast.id}
                open={toast.open}
                className={styles.root}
                duration={toast.duration}
                onOpenChange={(open) =>
                  setToasts((toasts) =>
                    toasts.map((t) => (t.id === toast.id ? { ...t, open } : t)),
                  )
                }
              >
                <ToastRenderer
                  type={toast.type}
                  title={toast.title}
                  description={toast.description}
                  action={toast.action}
                  onClose={() => service.hide(toast.id)}
                />
              </RadixToast.Root>
            ))}

            {/* As a workaround for https://github.com/radix-ui/primitives/issues/3301 ,
                we mount the toast viewport only once client mounts the component.
                (No toasts should be visible on the server-side render anyways.) */}
            {isMounted && <RadixToast.Viewport className={styles.viewport} />}
          </RadixToast.Provider>
        </MemoDataProvider>
      </GlobalActionsProvider>
    </ToastContext.Provider>
  );
}
