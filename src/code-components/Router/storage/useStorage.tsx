import { useMemo } from "react";
import { useInPlasmic } from "../../../common/useInPlasmic";
import { RouteStorage } from "./base";
import { buildBrowserRouteStorage } from "./browser";
import { buildMemoryRouteStorage } from "./memory";

export type RouteStorageType = "browser" | "memory";

export function useStorage({
  initialQueryString,
  type: typeProp,
}: {
  initialQueryString?: string;
  type?: RouteStorageType;
}): RouteStorage {
  const inPlasmic = useInPlasmic();

  const storage: RouteStorage = useMemo(() => {
    const type =
      typeProp ??
      (inPlasmic || typeof window === "undefined" ? "memory" : "browser");
    return type === "memory"
      ? buildMemoryRouteStorage({ initialQueryString })
      : buildBrowserRouteStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return storage;
}
