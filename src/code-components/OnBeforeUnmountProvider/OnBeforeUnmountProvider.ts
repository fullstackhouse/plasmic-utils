import { useEffect } from "react";

interface OnBeforeUnmountProviderProps {
  callback: (...args: never[]) => unknown;
}

export function OnBeforeUnmountProvider({
  callback,
}: OnBeforeUnmountProviderProps) {
  useEffect(() => {
    return () => {
      callback();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
