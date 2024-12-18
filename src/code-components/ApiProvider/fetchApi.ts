import { FetchError } from "./FetchError";

export type Query = Record<string, string>;

export interface FetchApiOptions {
  headers?: Record<string, string>;
  method: string;
  path: string;
  query?: Query;
  body?: Record<string, any>;
  useNodejsApi?: boolean;
  clientId?: string;
}

export async function fetchApi<TData>({
  headers,
  method,
  path,
  query,
  body,
  useNodejsApi,
  clientId,
}: FetchApiOptions): Promise<TData> {
  const { method: actualMethod, url } = useNodejsApi
    ? buildNewApiUrl({ method, path, query })
    : { method, url: addQueryToPath(path, query) };

  let response: Response;
  try {
    response = await fetch(url, {
      method: actualMethod,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        ...(body ? { "Content-Type": "application/json" } : undefined),
        ...(useNodejsApi && clientId
          ? {
              "X-Client-Id": clientId,
            }
          : {}),
        ...headers,
      },
    });
  } catch (error) {
    throw new FetchError(url, null, error);
  }

  if (response.ok) {
    try {
      return await response.json();
    } catch (error) {
      throw new FetchError(
        url,
        response,
        new TypeError(`response returned unparseable JSON (path=${path})`, {
          cause: error,
        }),
      );
    }
  }

  throw new FetchError(url, response);
}

function buildNewApiUrl({
  method,
  path,
  query,
}: {
  method: string;
  path: string;
  query?: Query;
}): { method: string; url: string } {
  const sendMethodAsParam = !isMethodSupportedByNewApi(method);
  const params = {
    method: sendMethodAsParam ? method : undefined,
    path: addQueryToPath(path, query),
  };
  const encodedQuery = new URLSearchParams(
    Object.entries(params).flatMap(([k, v]) =>
      v !== undefined ? [[k, v]] : [],
    ),
  ).toString();

  return {
    method: sendMethodAsParam ? "POST" : method,
    url: `/New/Api.ashx?${encodedQuery}`,
  };
}

function isMethodSupportedByNewApi(method: string) {
  return ["GET", "POST"].includes(method?.toUpperCase());
}

function addQueryToPath(path: string, query?: Query): string {
  return query
    ? `${path}?${new URLSearchParams(
        JSON.parse(JSON.stringify(query)),
      ).toString()}`
    : path;
}
