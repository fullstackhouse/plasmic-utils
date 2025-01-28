import {
  DataProvider,
  usePlasmicCanvasContext,
} from "@plasmicapp/react-web/lib/host";
import { ReactNode, useContext } from "react";
import useSWR, { SWRResponse, SWRConfiguration } from "swr";
import { FetchError } from "./FetchError";
import { Query, fetchApi } from "./fetchApi";
import { swrLaggyMiddleware } from "./swrLaggyMiddleware";
import {
  ResponseTransform,
  defaultResponseTransform,
} from "./transformResponse";
import { EditorMode, useMockedResponse } from "./useMockedResponse";
import { useOnError } from "./useOnError";
import { useOnLoad } from "./useOnLoad";
import { useShouldRetry } from "./useShouldRetry";
import { ApiContext } from "./ApiContext";

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
  refreshInterval?: number;
  transformResponse?: ResponseTransform;
  onLoad?(data: any): void;
  onError?(error: FetchError): void;
}

export type ApiResponse<Data = any, Error = any, Config = any> = SWRResponse<
  Data,
  Error,
  Config
>;

export function ApiProvider(props: ApiProviderProps) {
  const { clientId } = useContext(ApiContext);
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
    suspense,
    refreshInterval,
    transformResponse,
    onLoad,
    onError,
  } = fillProps(props);
  const inEditor = !!usePlasmicCanvasContext();
  const interactive = !inEditor || editorMode === EditorMode.interactive;
  const shouldRetry = useShouldRetry();
  const actualOnError = useOnError({ alertOnError, onError });

  const fetchOptions = {
    method,
    path,
    query,
    useNodejsApi,
    clientId,
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
      fetchApi(fetchOptions).then((data) =>
        transformResponse(data, fetchOptions),
      ),
    swrOptions,
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

  const { error } = mockedResponse;
  if (error && !(error instanceof FetchError)) {
    throw error;
  }

  return (
    <DataProvider name={name} data={mockedResponse}>
      {children}
    </DataProvider>
  );
}

function fillProps(props: ApiProviderProps) {
  return {
    method: "GET",
    cacheKey: [props.path, props.query],
    enabled: true,
    name: "response",
    editorMode: EditorMode.interactive,
    refetchIfStale: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retryOnError: true,
    alertOnError: true,
    useNodejsApi: true,
    suspense: false,
    transformResponse: defaultResponseTransform,
    ...props,
  };
}

export type ApiProviderFilledProps = ReturnType<typeof fillProps>;
