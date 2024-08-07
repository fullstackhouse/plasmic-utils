import { useEffect, useRef } from "react";

interface DOMEventListenerProps {
  onEvent: (event: Event) => void;
  eventType: string;
  passive: boolean;
  elementId?: string;
}

export function DOMEventListener({
  onEvent,
  eventType,
  passive,
  elementId,
}: DOMEventListenerProps) {
  const handleEventRef = useRef(onEvent);
  handleEventRef.current = onEvent;

  useEffect(() => {
    const listener = (event: Event) => handleEventRef.current?.(event);

    let element: HTMLElement | (Window & typeof globalThis) | null = null;

    if (elementId) {
      element = document.getElementById(elementId);
      if (!element) {
        console.warn(`Element with id "${elementId}" not found.`);
        return;
      }
    } else element = window;

    element.addEventListener(eventType, listener, { passive: passive });
    return () => element.removeEventListener(eventType, listener);
  }, [eventType, passive, elementId]);
}
