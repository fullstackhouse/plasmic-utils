import { DataProvider } from "@plasmicpkgs/plasmic-basic-components";
import { ReactNode } from "react";
import { Arguments } from "swr";
import useSWRMutation from "swr/mutation";
import { FetchError } from "./FetchError";
import { FetchApiOptions, Query, fetchApi } from "./fetchApi";
import { useOnError } from "./useOnError";
import { useOnLoad } from "./useOnLoad";
import {
  ResponseTransform,
  defaultResponseTransform,
} from "./transformResponse";

export interface ApiMutationProviderProps {
  method: string;
  path: string;
  query?: Query;
  cacheKey?: Arguments;
  name: string;
  children: ReactNode;
  alertOnError: boolean;
  throwOnError: boolean;
  useNodejsApi: boolean;
  transformResponse?: ResponseTransform;
  onLoad?(data: any): void;
  onError?(error: FetchError): void;
}

export function ApiMutationProvider({
  method,
  path,
  query,
  cacheKey = [path, query],
  name,
  children,
  alertOnError,
  throwOnError,
  useNodejsApi,
  transformResponse = defaultResponseTransform,
  onLoad,
  onError,
}: ApiMutationProviderProps) {
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
    },
  );

  useOnLoad({ onLoad, data: response.data });
  useOnError({
    onError,
    error: response.error,
    alertOnError,
  });

  return (
    <DataProvider name={name} data={response}>
      {children}
    </DataProvider>
  );
}
