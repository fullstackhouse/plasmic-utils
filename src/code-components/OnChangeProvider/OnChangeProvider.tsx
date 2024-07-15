import isEqual from "lodash.isequal";
import { ReactNode, useEffect, useRef } from "react";

export interface OnChangeProviderProps {
  data: unknown;
  runOnMount: boolean;
  deepEqualCheck: boolean;
  onChange?(data: unknown): void;
}

const noValue = Symbol();

/**
 * Call `onChange` whenever `data` changes.
 *
 * Performs deep equal check, so that onChange is called only when actually something changes in the data.
 */
export function OnChangeProvider({
  data,
  runOnMount,
  deepEqualCheck,
  onChange,
}: OnChangeProviderProps) {
  const prevDataRef = useRef<unknown>(runOnMount ? noValue : data);

  useEffect(() => {
    if (
      prevDataRef.current && deepEqualCheck
        ? isEqual(prevDataRef.current, data)
        : prevDataRef.current === data
    ) {
      return;
    }
    prevDataRef.current = data;
    onChange?.(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return null;
}
