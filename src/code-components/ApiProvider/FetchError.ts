export class FetchError extends Error {
  /**
   * Has the error been handled by the application already?
   *
   * E.g. feedback has been shown to the user about it, or they have been redirected somewhere because of the error.
   */
  handled: boolean = false;

  constructor(
    url: string,
    readonly response: Response | null,
    readonly cause?: unknown,
  ) {
    super(
      cause && cause instanceof Error
        ? cause.message
        : response
          ? `fetching ${url} failed with status ${response.status}`
          : `fetching ${url} failed for unknown reason`,
    );
    this.name = "FetchError";
  }
}
