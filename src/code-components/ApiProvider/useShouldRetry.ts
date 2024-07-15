import { FetchError } from "./FetchError";

type ShouldRetry = (err: Error) => boolean;

/**
 * Returns a function that says whether the request should be retried after meeting the given error.
 */
export function useShouldRetry(): ShouldRetry {
  return (error: Error) => {
    // If it's not a fetch error, it's an application error.
    // In such a case, don't retry the request, as most likely the error will repeat anyways.
    if (!(error instanceof FetchError)) {
      return false;
    }

    // If it's a 5xx error or a network error (response has not came back from the server),
    // repeat the request.
    if (!error.response || error.response.status >= 500) {
      return true;
    }

    // Otherwise, don't repeat the request.
    // (E.g. it's a 4xx error which likely will repeat.)
    return false;
  };
}
