import { useEffect, useRef, useState } from "react";
import { ApiProviderFilledProps } from "./ApiProvider";
import { FetchError } from "./FetchError";
import { ToastService } from "../../ToastContextProvider/ToastContext";
import { dispatchUnauthorizedEvent } from "./UnauthorizedEvent";
import { useSelector } from "@plasmicapp/react-web/lib/host";
import { useTrackBeforeUnload } from "./useTrackBeforeUnload";

type OnError = (error: Error | undefined) => Promise<void>;

export function useOnError({
  alertOnError,
  onError,
}: Pick<ApiProviderFilledProps, "alertOnError" | "onError">): OnError {
  const requestCancelled = useTrackBeforeUnload();
  const toast = useSelector("toast") as ToastService | undefined;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  return async (error: Error | undefined) => {
    await handleApiError(error, {
      requestCancelled,
      toast: alertOnError ? toast : undefined,
      onError: onErrorRef.current,
    });
  };
}

async function handleApiError(
  error: Error | undefined,
  {
    requestCancelled,
    toast,
    onError,
  }: {
    requestCancelled: boolean;
    toast: ToastService | undefined;
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

  if (!error.handled && error.response?.status === 401) {
    dispatchUnauthorizedEvent();
    if (toast) {
      error.handled = true;
      toast.show({
        id: "unauthorized",
        type: "warning",
        title: "Session Expired",
        description:
          "Your session has expired. The application may not work correctly. Please log in again to continue.",
      });
    }
  }

  if (!error.handled && error.response?.status === 422 && toast) {
    error.handled = true;
    const message = await getMessage(error.response);
    toast.show({
      type: "error",
      title: "Unprocessable Content",
      description: message,
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

async function getMessage(response: Response): Promise<string | undefined> {
  try {
    const json = await response.json();
    return json?.message;
  } catch (error) {
    console.error(`response returned unparseable JSON`, error);
    return undefined;
  }
}
