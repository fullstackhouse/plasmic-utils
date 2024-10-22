import { useEffect, useRef, useState } from "react";
import { ApiProviderProps } from "./ApiProvider";
import { FetchError } from "./FetchError";
import { ToastContext } from "../../ToastContextProvider/ToastContext";
import { dispatchUnauthorizedEvent } from "./UnauthorizedEvent";
import { useSelector } from "@plasmicapp/react-web/lib/host";
import { useTrackBeforeUnload } from "./useTrackBeforeUnload";

/**
 * Whenever `error` changes and is present:
 *
 * - throw the error immediately if it's not a `FetchError`,
 * - show a network error alert to the user (if it's an unhandled network error),
 * - call `onError`.
 */
export function useOnError({
  onError,
  error,
  alertOnError,
}: {
  onError: ApiProviderProps["onError"];
  error: Error | undefined;
  alertOnError: boolean;
}) {
  const requestCancelled = useTrackBeforeUnload();
  const toast = useSelector("toast") as ToastContext | undefined;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  if (error && !(error instanceof FetchError)) {
    throw error;
  }

  useEffect(() => {
    if (!error) {
      return;
    }

    if (process.env.NODE_ENV !== "test") {
      console.error(error);
    }

    // If it's been a 401 error,
    // redirect the user to authentication page
    // and don't do anything else.
    if (!error.handled && error.response?.status === 401) {
      error.handled = true;
      dispatchUnauthorizedEvent();
    }

    if (!error.handled && alertOnError && !requestCancelled && toast) {
      error.handled = true;
      toast.show({
        id: "server-error",
        type: "error",
        title: "Server Error",
        description:
          "There have been some troubles while loading data from the server. If the problem persists, refresh the page or contact support for help.",
      });
    }

    onErrorRef.current?.(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
}
