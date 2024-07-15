import { usePlasmicCanvasContext } from "@plasmicapp/host";
import { DataProvider } from "@plasmicpkgs/plasmic-basic-components";
import { ReactNode } from "react";
import useSWR from "swr";
import { FetchError } from "./FetchError";
import { FetchApiOptions, Query, fetchApi } from "./fetchApi";
import { swrLaggyMiddleware } from "./swrLaggyMiddleware";
import { EditorMode, useMockedResponse } from "./useMockedResponse";
import { useOnError } from "./useOnError";
import { useOnLoad } from "./useOnLoad";
import { useShouldRetry } from "./useShouldRetry";
import {
  ResponseTransform,
  defaultResponseTransform,
} from "./transformResponse";
import { AuthLoginType } from "../../common/auth/triggerAuthLogin";

export interface ApiProviderProps {
  method?: string;
  path: string;
  query?: Query;
  cacheKey?: any;
  enabled?: boolean;
  name: string;
  editorMode?: EditorMode;
  previewData?: any;
  children: ReactNode;
  refetchIfStale?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  retryOnError?: boolean;
  alertOnError?: boolean;
  useNodejsApi?: boolean;
  transformResponse?: ResponseTransform;
  onLoad?(data: any): void;
  onError?(error: FetchError): void;
}

export function ApiProvider({
  method = "GET",
  path,
  query,
  cacheKey = [path, query],
  enabled,
  name,
  editorMode = EditorMode.interactive,
  previewData,
  children,
  refetchIfStale = true,
  refetchOnWindowFocus = false,
  refetchOnReconnect = false,
  retryOnError = true,
  alertOnError = true,
  useNodejsApi = true,
  transformResponse = defaultResponseTransform,
  onLoad,
  onError,
}: ApiProviderProps) {
  const inEditor = !!usePlasmicCanvasContext();
  const interactive = !inEditor || editorMode === EditorMode.interactive;
  const shouldRetry = useShouldRetry();

  const fetchOptions = { method, path, query, useNodejsApi };
  const response = useSWR(
    enabled && interactive ? cacheKey : null,
    () => {
      return fetchApi(fetchOptions).then((data) =>
        transformResponse(data, fetchOptions),
      );
    },
    {
      use: [swrLaggyMiddleware],
      revalidateIfStale: refetchIfStale,
      revalidateOnFocus: refetchOnWindowFocus,
      revalidateOnReconnect: refetchOnReconnect,
      shouldRetryOnError: retryOnError && shouldRetry,
    },
  );

  const mockedResponse = useMockedResponse({
    response,
    inEditor,
    editorMode,
    previewData,
    transformResponse,
    fetchOptions,
  });

  useOnLoad({ onLoad, data: mockedResponse.data });
  useOnError({
    onError,
    error: mockedResponse.error,
    alertOnError,
    authLoginType: inEditor ? AuthLoginType.Modal : AuthLoginType.Redirect,
  });

  return (
    <DataProvider name={name} data={mockedResponse}>
      {children}
    </DataProvider>
  );
}
