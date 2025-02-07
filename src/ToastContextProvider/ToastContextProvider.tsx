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
import { ToastContext, ToastType } from "./ToastContext";
import styles from "./ToastContextProvider.module.css";
import { toastContextProviderConfig } from "./config";

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

  const context = useMemo<ToastContext>(
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

  useEffect(() => {
    window.__myevalsPlasmicUtilsToast = context;
    return () => {
      delete window.__myevalsPlasmicUtilsToast;
    };
  }, [context]);

  const ToastRenderer = toastContextProviderConfig.toastRenderer;

  return (
    <GlobalActionsProvider
      contextName="ToastContext"
      actions={context as Record<keyof ToastContext, Function>}
    >
      <MemoDataProvider name="toast" data={context} deps={[context]}>
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
                onClose={() => context.hide(toast.id)}
              />
            </RadixToast.Root>
          ))}

          <RadixToast.Viewport className={styles.viewport} />
        </RadixToast.Provider>
      </MemoDataProvider>
    </GlobalActionsProvider>
  );
}
