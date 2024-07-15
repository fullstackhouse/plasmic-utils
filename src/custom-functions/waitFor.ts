export class TimeoutError extends Error {
  readonly name = "TimeoutError";
}

export async function waitFor(
  callback: () => boolean,
  {
    timeout: timeoutDelay = 100,
    pollInterval = 30,
  }: {
    timeout?: number;
    pollInterval?: number;
  } = {},
): Promise<void> {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      try {
        if (callback()) {
          clearInterval(interval);
          clearTimeout(timeout);
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    }, pollInterval);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      reject(new TimeoutError("waitFor timed out"));
    }, timeoutDelay);
  });
}
