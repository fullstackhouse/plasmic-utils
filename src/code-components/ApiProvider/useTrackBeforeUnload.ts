import { RefObject, useEffect, useRef } from "react";

/**
 * Returns a ref that is true while the page may be unloading:
 * since a `beforeunload` window event, until the user interacts with the page again.
 *
 * The interaction means the page stayed, e.g. the user cancelled the "Leave site?" dialog
 * or followed a link that only downloads a file. Browsers have no event for that.
 */
export function useTrackBeforeUnload(): RefObject<boolean> {
  const unloadingRef = useRef(false);

  useEffect(() => {
    const handleBeforeUnload = () => {
      unloadingRef.current = true;
    };
    const handleInteraction = () => {
      unloadingRef.current = false;
    };

    window.addEventListener("beforeunload", handleBeforeUnload, {
      passive: true,
    });
    window.addEventListener("pointerdown", handleInteraction, {
      capture: true,
      passive: true,
    });
    window.addEventListener("keydown", handleInteraction, {
      capture: true,
      passive: true,
    });
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pointerdown", handleInteraction, {
        capture: true,
      });
      window.removeEventListener("keydown", handleInteraction, {
        capture: true,
      });
    };
  }, []);

  return unloadingRef;
}
