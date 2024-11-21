import { useMemo } from "react";
import { useInPlasmic } from "../../common/useInPlasmic";
import { RouterAdapter } from "./adapters/base";
import { buildBrowserRouterAdapter } from "./adapters/browser";
import { buildMemoryRouterAdapter } from "./adapters/memory";

export type AdapterType = "browser" | "memory";

export function useAdapter({
  initialQueryString,
  type: typeProp,
}: {
  initialQueryString?: string;
  type?: AdapterType;
}): RouterAdapter {
  const inPlasmic = useInPlasmic();

  const adapter: RouterAdapter = useMemo(() => {
    const adapterType =
      typeProp ??
      (inPlasmic || typeof window === "undefined" ? "memory" : "browser");
    return adapterType === "memory"
      ? buildMemoryRouterAdapter({ initialQueryString })
      : buildBrowserRouterAdapter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return adapter;
}
