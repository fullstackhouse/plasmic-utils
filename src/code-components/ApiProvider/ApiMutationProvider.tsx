import { ReactNode, useContext, useMemo } from "react";
import { Arguments } from "swr";
import useSWRMutation from "swr/mutation";
import { MemoDataProvider } from "../MemoDataProvider/MemoDataProvider";
import { ApiContext } from "./ApiContext";
import { FetchError } from "./FetchError";
import {
  ResponseTransform,
  defaultResponseTransform,
} from "./transformResponse";
import { useOnError } from "./useOnError";
import { useOnLoad } from "./useOnLoad";
import { ApiRequest } from "./middlewares/middleware";

export interface ApiMutationProviderProps {
  method?: string;
  path: string;
  query?: Record<string, string>;
  cacheKey?: Arguments;
  name?: string;
  children: ReactNode;
  alertOnError?: boolean;
  throwOnError?: boolean;
  useNodejsApi?: boolean;
  middleware?: string;
  transformResponse?: ResponseTransform;
  onLoad?(data: any): void;
  onError?(error: FetchError): Promise<void>;
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
  middleware: middlewareProp,
  transformResponse = defaultResponseTransform,
  onLoad,
  onError,
}: ApiMutationProviderProps) {
  const { middlewares } = useContext(ApiContext);
  const middlewareName =
    middlewareProp ?? (useNodejsApi ? "myevals-nodejs-backend" : "json");
  const middleware = middlewares[middlewareName];
  if (!middleware) {
    throw new Error(
      `middleware "${middlewareName}" not found in registered middlewares: ${Object.keys(middlewares).join(",")}`,
    );
  }

  const actualOnError = useOnError({ alertOnError, onError });
  const response = useSWRMutation<any, Error, Arguments, Partial<ApiRequest>>(
    cacheKey,
    (key: string, { arg: options }: { arg: Partial<ApiRequest> }) => {
      const request: ApiRequest = {
        method,
        path,
        query,
        ...options,
      };
      return middleware
        .fetch(request)
        .then((data: any) => transformResponse(data, request));
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

  const memoResponse = useMemo(() => {
    return response;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response.data, response.error, response.isMutating]);

  return (
    <MemoDataProvider name={name} data={memoResponse} deps={[memoResponse]}>
      {children}
    </MemoDataProvider>
  );
}
