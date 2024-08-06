import { useEffect, useRef } from "react";

interface WindowEventListenerProps {
  onEvent: (event: Event) => void;
  eventType: string;
  passive: boolean;
  elementId?: string | null;
}

export function WindowEventListener({
  onEvent,
  eventType,
  passive,
  elementId,
}: WindowEventListenerProps) {
  const handleEventRef = useRef(onEvent);
  handleEventRef.current = onEvent;

  useEffect(() => {
    const listener = (event: Event) => handleEventRef.current?.(event);

    const element = elementId ? document.getElementById(elementId) : window;
    if (element) {
      element.addEventListener(eventType, listener, { passive: passive });
      return () => element.removeEventListener(eventType, listener);
    }
  }, [eventType, passive, elementId]);
}
