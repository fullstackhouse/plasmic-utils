import { FetchError } from "../FetchError";
import { ApiMiddleware, ApiRequest } from "./middleware";

class ApiError extends Error {}

export const jsonApiMiddleware: ApiMiddleware = {
  name: "json",
  async fetch(request) {
    let response: Response | null = null;
    try {
      response = await fetchResponse(request);

      if (!response.ok) {
        throw new ApiError(
          `response returned unsucccessful code (${response.status})`,
        );
      }

      const contentType = response.headers.get("Content-Type");
      if (!contentType) {
        return null;
      }

      return await parseResponseBody(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw new FetchError(request.path, response, error);
      }

      throw error;
    }
  },
};

async function fetchResponse(request: ApiRequest): Promise<Response> {
  const url = addQueryToPath(request.path, request.query);

  try {
    return await fetch(url, {
      headers: {
        ...(request.body ? { "Content-Type": "application/json" } : undefined),
        ...request.headers,
      },
      method: request.method,
      body: request.body ? JSON.stringify(request.body) : undefined,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, { cause: error });
    }

    throw new ApiError("fetch failed", { cause: error });
  }
}

async function parseResponseBody(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch (error) {
    throw new ApiError(`response returned unparseable JSON`);
  }
}

function addQueryToPath(path: string, query?: Record<string, string>): string {
  return query
    ? `${path}?${new URLSearchParams(
        JSON.parse(JSON.stringify(query)),
      ).toString()}`
    : path;
}
