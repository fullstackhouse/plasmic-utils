import { ReactNode } from "react";
import { ApiProvider, ApiProviderProps } from "../ApiProvider";
import { EditorMode } from "../useMockedResponse";
import { ResponseTransform } from "../transformResponse";

export interface GraphqlApiProviderProps {
  path: string;
  query: { query: string; variables?: Record<string, any> };
  variables?: Record<string, any>;
  middleware?: string;
  cacheKey?: any;
  enabled?: boolean;
  contextName?: string;
  editorMode?: EditorMode;
  previewData?: any;
  children: ReactNode;
  refetchIfStale?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  retryOnError?: boolean;
  alertOnError?: boolean;
  transformResponse?: ResponseTransform;
  suspense?: boolean;
  refreshInterval?: number;
  onLoad?(data: any): void;
  onError?(error: Error): void;
}

export function GraphqlApiProvider(props: GraphqlApiProviderProps) {
  const apiProviderProps: ApiProviderProps = {
    path: props.path,
    query: {
      query: props.query.query,
      variables: props.variables ?? props.query.variables,
    } as any,
    middleware: props.middleware,
    cacheKey: props.cacheKey,
    enabled: props.enabled,
    name: props.contextName,
    editorMode: props.editorMode,
    previewData: props.previewData,
    refetchIfStale: props.refetchIfStale,
    refetchOnWindowFocus: props.refetchOnWindowFocus,
    refetchOnReconnect: props.refetchOnReconnect,
    retryOnError: props.retryOnError,
    alertOnError: props.alertOnError,
    transformResponse: props.transformResponse,
    suspense: props.suspense,
    refreshInterval: props.refreshInterval,
    onLoad: props.onLoad,
    onError: props.onError,
    children: props.children,
  };
  return <ApiProvider {...apiProviderProps} />;
}
