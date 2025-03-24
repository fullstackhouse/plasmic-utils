import { FetchError } from "../FetchError";
import { ApiMiddleware, ApiRequest } from "./middleware";

class ApiError extends Error {}

export const graphqlApiMiddleware: ApiMiddleware = {
  name: "graphql",
  async fetch(request) {
    let response: Response | null = null;

    try {
      response = await fetchResponse(request);
      const body = await parseResponseBody(response);
      if (body == null || typeof body !== "object") {
        throw new ApiError(`invalid response body`);
      }

      const error = findGraphqlErrorMessage(body);
      if (error) {
        throw new ApiError(error);
      }

      if (!response.ok) {
        throw new ApiError(
          `response returned unsucccessful code (${response.status})`,
        );
      }

      if (!("data" in body)) {
        throw new ApiError("response body is missing `data` property");
      }

      return body.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new FetchError(request.path, response, error);
      }

      throw error;
    }
  },
};

async function fetchResponse(request: ApiRequest): Promise<Response> {
  if (request.body) {
    throw new Error(
      `\`request.body\` is not accepted in GraphQL requests. Use \`request.query\` instead`,
    );
  }

  try {
    return await fetch(request.path, {
      headers: {
        "Content-Type": "application/json",
        ...request.headers,
      },
      method: request.method,
      body: JSON.stringify(request.query),
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

function findGraphqlErrorMessage(body: object): string | undefined {
  if (
    !("errors" in body && Array.isArray(body.errors) && body.errors.length > 0)
  ) {
    return;
  }

  const error = body.errors[0];
  if ("message" in error && typeof error.message === "string") {
    return error.message;
  }

  return JSON.stringify(error);
}
