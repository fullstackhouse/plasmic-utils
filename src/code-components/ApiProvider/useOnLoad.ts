import { useEffect, useRef } from "react";
import { ApiProviderProps } from "./ApiProvider";

/**
 * Call `onLoad` whenever `data` changes and is present.
 */
export function useOnLoad({
  onLoad,
  data,
}: {
  onLoad: ApiProviderProps["onLoad"];
  data: any;
}) {
  const onLoadRef = useRef(onLoad);
  onLoadRef.current = onLoad;

  useEffect(() => {
    if (data !== undefined) {
      onLoadRef.current?.(data);
    }
  }, [data]);
}
