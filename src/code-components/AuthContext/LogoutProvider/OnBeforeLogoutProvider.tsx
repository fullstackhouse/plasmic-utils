import { useContext, useEffect, useRef } from "react";
import { LogoutContext, LogoutEvent, LogoutListener } from "./LogoutContext";

interface OnBeforeLogoutProviderProps {
  onBeforeLogout: LogoutListener;
}

export function OnBeforeLogoutProvider({
  onBeforeLogout,
}: OnBeforeLogoutProviderProps) {
  const context = useContext(LogoutContext);

  const onBeforeLogoutRef = useRef(onBeforeLogout);
  onBeforeLogoutRef.current = onBeforeLogout;

  useEffect(() => {
    function onBeforeLogout(event: LogoutEvent) {
      return onBeforeLogoutRef.current(event);
    }

    context.addListener(onBeforeLogout);
    return () => context.removeListener(onBeforeLogout);
  }, [context]);

  return null;
}
