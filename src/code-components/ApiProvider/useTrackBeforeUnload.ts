import { useEffect, useState } from "react";

/**
 * Returns true if a `beforeunload` window event has been triggered
 * while this component was mounted.
 */
export function useTrackBeforeUnload(): boolean {
  const [beforeUnloadTriggered, setBeforeUnloadTriggered] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = () => setBeforeUnloadTriggered(true);
    window.addEventListener("beforeunload", handleBeforeUnload, {
      passive: true,
    });
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return beforeUnloadTriggered;
}
