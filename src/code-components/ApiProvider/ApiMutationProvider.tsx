import { ReactNode, useContext } from "react";
import { Arguments } from "swr";
import useSWRMutation from "swr/mutation";
import { MemoDataProvider } from "../MemoDataProvider/MemoDataProvider";
import { ApiContext } from "./ApiContext";
import { FetchError } from "./FetchError";
import { FetchApiOptions, Query, fetchApi } from "./fetchApi";
import {
  ResponseTransform,
  defaultResponseTransform,
} from "./transformResponse";
import { useOnError } from "./useOnError";
import { useOnLoad } from "./useOnLoad";

export interface ApiMutationProviderProps {
  method?: string;
  path: string;
  query?: Query;
  cacheKey?: Arguments;
  name?: string;
  children: ReactNode;
  alertOnError?: boolean;
  throwOnError?: boolean;
  useNodejsApi: boolean;
  transformResponse?: ResponseTransform;
  onLoad?(data: any): void;
  onError?(error: FetchError): void;
}

export function ApiMutationProvider({
  method = "POST",
  path,
  query,
  cacheKey = [path, query],
  name = "response",
  children,
  alertOnError = true,
  throwOnError = true,
  useNodejsApi,
  transformResponse = defaultResponseTransform,
  onLoad,
  onError,
}: ApiMutationProviderProps) {
  const { clientId } = useContext(ApiContext);
  const actualOnError = useOnError({ alertOnError, onError });
  const response = useSWRMutation<
    any,
    Error,
    Arguments,
    Partial<FetchApiOptions>
  >(
    cacheKey,
    (key: string, { arg: options }: { arg: Partial<FetchApiOptions> }) => {
      const fetchOptions = {
        method,
        path,
        query,
        useNodejsApi,
        clientId,
        ...options,
      };
      return fetchApi(fetchOptions).then((data) =>
        transformResponse(data, fetchOptions),
      );
    },
    {
      // swr accepts either `true` or `false` but not `boolean` in here
      // let's assert it's always true (even though it's a boolean, which it may be).
      throwOnError: throwOnError as true,
      onError: actualOnError,
    },
  );

  useOnLoad({ onLoad, data: response.data });

  const { error } = response;
  if (error && !(error instanceof FetchError)) {
    throw error;
  }

  return (
    <MemoDataProvider name={name} data={response} memoKey={response}>
      {children}
    </MemoDataProvider>
  );
}
