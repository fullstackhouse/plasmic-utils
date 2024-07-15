import { useCallback, useEffect, useRef } from "react";
import useSWR, { Middleware } from "swr";

/**
 * A SWR middleware for keeping the data even if key changes.
 *
 * Taken from https://swr.vercel.app/docs/middleware#keep-previous-result .
 */
export function swrLaggyMiddleware(
  useSWRNext: typeof useSWR,
): ReturnType<Middleware> {
  return (key, fetcher, config) => {
    const laggyDataRef = useRef<any>();
    const swr = useSWRNext(key, fetcher, config);

    useEffect(() => {
      if (swr.data !== undefined) {
        laggyDataRef.current = swr.data;
      }
    }, [swr.data]);

    const resetLaggy = useCallback(() => {
      laggyDataRef.current = undefined;
    }, []);

    const dataOrLaggyData =
      swr.data === undefined ? laggyDataRef.current : swr.data;

    const isLagging =
      swr.data === undefined && laggyDataRef.current !== undefined;

    return {
      ...swr,
      data: dataOrLaggyData,
      isLagging,
      resetLaggy,
    };
  };
}
