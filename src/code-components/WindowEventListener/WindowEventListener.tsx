import { useEffect, useRef } from "react";

interface WindowEventListenerProps {
  onEvent: (event: Event) => void;
  eventType: string;
  passive: boolean;
}

export function WindowEventListener({
  onEvent,
  eventType,
  passive,
}: WindowEventListenerProps) {
  const handleEventRef = useRef(onEvent);
  handleEventRef.current = onEvent;

  useEffect(() => {
    const listener = (event: Event) => handleEventRef.current?.(event);

    window.addEventListener(eventType, listener, { passive: passive });
    return () => window.removeEventListener(eventType, listener);
  }, [eventType, passive]);
}
