import { FetchError } from "../FetchError";
import { ApiMiddleware } from "./middleware";

export const jsonApiMiddleware: ApiMiddleware = {
  name: "json",
  async fetch(request) {
    const url = addQueryToPath(request.path, request.query);

    let response: Response;
    try {
      response = await fetch(url, {
        headers: {
          ...(request.body
            ? { "Content-Type": "application/json" }
            : undefined),
          ...request.headers,
        },
        method: request.method,
        body: request.body ? JSON.stringify(request.body) : undefined,
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
          new TypeError(`response returned unparseable JSON`, {
            cause: error,
          }),
        );
      }
    }

    throw new FetchError(url, response);
  },
};

function addQueryToPath(path: string, query?: Record<string, string>): string {
  return query
    ? `${path}?${new URLSearchParams(
        JSON.parse(JSON.stringify(query)),
      ).toString()}`
    : path;
}
