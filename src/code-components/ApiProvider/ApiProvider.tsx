import { usePlasmicCanvasContext } from "@plasmicapp/react-web/lib/host";
import { ReactNode, useContext, useMemo } from "react";
import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { MemoDataProvider } from "../MemoDataProvider/MemoDataProvider";
import { ApiContext } from "./ApiContext";
import { FetchError } from "./FetchError";
import { swrLaggyMiddleware } from "./swrLaggyMiddleware";
import {
  ResponseTransform,
  defaultResponseTransform,
} from "./transformResponse";
import { EditorMode, useMockedResponse } from "./useMockedResponse";
import { useOnError } from "./useOnError";
import { useOnLoad } from "./useOnLoad";
import { useShouldRetry } from "./useShouldRetry";
import { ApiRequest } from "./middlewares/middleware";

export interface ApiProviderProps {
  method?: string;
  path: string;
  query?: Record<string, string>;
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
  middleware?: string;
  suspense?: boolean;
  refreshInterval?: number;
  transformResponse?: ResponseTransform;
  onLoad?(data: any): void;
  onError?(error: FetchError): void;
}

export type ApiResponse<Data = any, Error = any, Config = any> = SWRResponse<
  Data,
  Error,
  Config
> & { isLagging: boolean };

export function ApiProvider(props: ApiProviderProps) {
  const {
    method,
    path,
    query,
    cacheKey,
    enabled,
    name,
    editorMode,
    previewData,
    children,
    refetchIfStale,
    refetchOnWindowFocus,
    refetchOnReconnect,
    retryOnError,
    alertOnError,
    useNodejsApi,
    middleware: middlewareProp,
    suspense,
    refreshInterval,
    transformResponse,
    onLoad,
    onError,
  } = fillProps(props);
  const { middlewares } = useContext(ApiContext);
  const middlewareName =
    middlewareProp ?? (useNodejsApi ? "myevals-nodejs-backend" : "json");
  const middleware = middlewares[middlewareName];
  if (!middleware) {
    throw new Error(
      `middleware "${middlewareName}" not found in registered middlewares: ${Object.keys(middlewares).join(",")}`,
    );
  }

  const inEditor = !!usePlasmicCanvasContext();
  const interactive = !inEditor || editorMode === EditorMode.interactive;
  const shouldRetry = useShouldRetry();
  const actualOnError = useOnError({ alertOnError, onError });

  const request: ApiRequest = {
    method,
    path,
    query,
  };

  const swrOptions: SWRConfiguration = {
    use: [swrLaggyMiddleware],
    revalidateIfStale: refetchIfStale,
    revalidateOnFocus: refetchOnWindowFocus,
    revalidateOnReconnect: refetchOnReconnect,
    shouldRetryOnError: retryOnError && shouldRetry,
    suspense,
    refreshInterval,
    onError: actualOnError,
  };

  const response = useSWR(
    enabled && interactive ? cacheKey : null,
    () =>
      middleware
        .fetch(request)
        .then((data: any) => transformResponse(data, request)),
    swrOptions,
  ) as ApiResponse;

  const mockedResponse: ApiResponse = useMockedResponse({
    response,
    inEditor,
    editorMode,
    previewData,
    transformResponse,
    request,
  });

  useOnLoad({ onLoad, data: mockedResponse.data });

  const { error } = mockedResponse;
  if (error && !(error instanceof FetchError)) {
    throw error;
  }

  const memoResponse = useMemo(() => {
    return mockedResponse;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mockedResponse.data,
    mockedResponse.error,
    mockedResponse.isLoading,
    mockedResponse.isLagging,
    mockedResponse.isValidating,
  ]);

  return (
    <MemoDataProvider name={name} data={memoResponse} deps={[memoResponse]}>
      {children}
    </MemoDataProvider>
  );
}

function fillProps(props: ApiProviderProps) {
  return {
    ...props,
    method: props.method ?? "GET",
    cacheKey: props.cacheKey ?? [props.path, props.query],
    enabled: props.enabled ?? false,
    name: props.name ?? "response",
    editorMode: props.editorMode ?? EditorMode.interactive,
    refetchIfStale: props.refetchIfStale ?? true,
    refetchOnWindowFocus: props.refetchOnWindowFocus ?? false,
    refetchOnReconnect: props.refetchOnReconnect ?? false,
    retryOnError: props.retryOnError ?? true,
    alertOnError: props.alertOnError ?? true,
    suspense: props.suspense ?? false,
    transformResponse: props.transformResponse ?? defaultResponseTransform,
  };
}

export type ApiProviderFilledProps = ReturnType<typeof fillProps>;
