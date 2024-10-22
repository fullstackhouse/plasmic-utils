import { ReactNode } from "react";
import useSWR, { SWRResponse } from "swr";
import { FetchError } from "./FetchError";
import { Query, fetchApi } from "./fetchApi";
import { swrLaggyMiddleware } from "./swrLaggyMiddleware";
import { EditorMode, useMockedResponse } from "./useMockedResponse";
import { useOnError } from "./useOnError";
import { useOnLoad } from "./useOnLoad";
import { useShouldRetry } from "./useShouldRetry";
import {
  ResponseTransform,
  defaultResponseTransform,
} from "./transformResponse";
import {
  DataProvider,
  usePlasmicCanvasContext,
} from "@plasmicapp/react-web/lib/host";

export interface ApiProviderProps {
  method?: string;
  path: string;
  query?: Query;
  cacheKey?: any;
  enabled?: boolean;
  name?: string;
  editorMode?: EditorMode;
  previewData?: any;
  children: ReactNode;
  refetchIfStale?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  retryOnError?: boolean;
  alertOnError?: boolean;
  useNodejsApi?: boolean;
  suspense?: boolean;
  transformResponse?: ResponseTransform;
  onLoad?(data: any): void;
  onError?(error: FetchError): void;
}

export type ApiResponse<Data = any, Error = any, Config = any> = SWRResponse<
  Data,
  Error,
  Config
>;

export function ApiProvider({
  method = "GET",
  path,
  query,
  cacheKey = [path, query],
  enabled = true,
  name = "response",
  editorMode = EditorMode.interactive,
  previewData,
  children,
  refetchIfStale = true,
  refetchOnWindowFocus = false,
  refetchOnReconnect = false,
  retryOnError = true,
  alertOnError = true,
  useNodejsApi = true,
  suspense = false,
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
      suspense,
    },
  );

  const mockedResponse: ApiResponse = useMockedResponse({
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
  });

  return (
    <DataProvider name={name} data={mockedResponse}>
      {children}
    </DataProvider>
  );
}
