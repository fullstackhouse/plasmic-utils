import {
  ContextType,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { LogoutListener, LogoutContext, LogoutEvent } from "./LogoutContext";
import { DataProvider } from "@plasmicapp/host";

export function LogoutContextProvider({ children }: { children: ReactNode }) {
  const listeners = useRef<LogoutListener[]>([]);
  const [logoutPending, setLogoutPending] = useState(false);

  const logout = useCallback(async () => {
    const event: LogoutEvent = {
      defaultPrevented: false,
      isAutoSave: false,
      preventDefault() {
        event.defaultPrevented = true;
      },
    };

    try {
      setLogoutPending(true);
      await Promise.all(listeners.current.map((callback) => callback(event)));
      if (!event.defaultPrevented) {
        await redirectToLogout(event.isAutoSave);
      }
    } finally {
      setLogoutPending(false);
    }
  }, []);

  const context = useMemo((): ContextType<typeof LogoutContext> => {
    return {
      pending: logoutPending,
      call: logout,

      addListener(callback) {
        if (listeners.current.includes(callback)) return;
        listeners.current.push(callback);
      },

      removeListener(callback) {
        listeners.current = listeners.current.filter((x) => x !== callback);
      },
    };
  }, [logout, logoutPending]);

  return (
    <LogoutContext.Provider value={context}>
      <DataProvider name="logout" data={context}>
        {children}
      </DataProvider>
    </LogoutContext.Provider>
  );
}

function redirectToLogout(isAutoSave: boolean = false): Promise<void> {
  document.location.href = isAutoSave
    ? `/Logout.aspx?IsAutoSave=1`
    : `/Logout.aspx`;

  /**
   * Ideally this promise could never resolve (assuming that logout always ends up successfully with a redirect).
   * However a user can cancel it, so we'll emulate only for the first few seconds that the logout is pending
   * - after which we'll let the user trigger the logout again.
   */
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
}
