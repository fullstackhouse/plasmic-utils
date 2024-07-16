export const unauthorizedEventName = "unauthorized";

export function dispatchUnauthorizedEvent() {
  window.dispatchEvent(new Event(unauthorizedEventName));
}

/**
 * Registers a callback that will be invoked whenever API returns an Unauthorized error.
 *
 * Returns a function that deregisters the callback.
 */
export function subscribeToUnauthorizedEvents(
  callback: () => void,
): () => void {
  window.addEventListener(unauthorizedEventName, callback);
  return () => {
    window.removeEventListener(unauthorizedEventName, callback);
  };
}
