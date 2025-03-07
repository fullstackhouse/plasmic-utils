import { useEffect, useRef, useState } from "react";
import { ApiProviderFilledProps } from "./ApiProvider";
import { FetchError } from "./FetchError";
import { ToastContext } from "../../ToastContextProvider/ToastContext";
import { dispatchUnauthorizedEvent } from "./UnauthorizedEvent";
import { useSelector } from "@plasmicapp/react-web/lib/host";
import { useTrackBeforeUnload } from "./useTrackBeforeUnload";

type OnError = (error: Error | undefined) => void;

export function useOnError({
  alertOnError,
  onError,
}: Pick<ApiProviderFilledProps, "alertOnError" | "onError">): OnError {
  const requestCancelled = useTrackBeforeUnload();
  const toast = useSelector("toast") as ToastContext | undefined;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  return (error: Error | undefined) => {
    handleApiError(error, {
      requestCancelled,
      toast: alertOnError ? toast : undefined,
      onError: onErrorRef.current,
    });
  };
}

function handleApiError(
  error: Error | undefined,
  {
    requestCancelled,
    toast,
    onError,
  }: {
    requestCancelled: boolean;
    toast: ToastContext | undefined;
    onError: ApiProviderFilledProps["onError"];
  },
) {
  if (!error || !(error instanceof FetchError)) {
    return;
  }

  if (process.env.NODE_ENV !== "test") {
    console.error(error);
  }

  onError?.(error);

  if (!error.handled && error.response?.status === 401 && toast) {
    dispatchUnauthorizedEvent();
    error.handled = true;
    toast.show({
      id: "unauthorized",
      type: "warning",
      title: "Session Expired",
      description:
        "Your session has expired. The application may not work correctly. Please log in again to continue.",
    });
  }

  if (!error.handled && !requestCancelled && toast) {
    error.handled = true;
    toast.show({
      id: "server-error",
      type: "error",
      title: "Server Error",
      description:
        "There have been some troubles while loading data from the server. If the problem persists, refresh the page or contact support for help.",
    });
  }
}
