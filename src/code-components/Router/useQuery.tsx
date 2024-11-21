import { useMemo } from "react";
import { RouteStorage } from "./storage/base";
import { useRoute } from "./useRoute";
import { RouteContext, RouterActions } from "./useRouterContext";
import { buildQueryString, parseQueryString } from "./utils/queryString";

export function useQuery(
  storage: RouteStorage,
): [RouteContext["query"], RouteContext["setQuery"]] {
  const currentRoute = useRoute(storage);

  return useMemo(() => {
    const currentQuery = parseQueryString(currentRoute.queryString ?? "");

    const setQuery: RouterActions["setQuery"] = (
      query,
      { merge = true, push = false } = {},
    ) => {
      const prevRoute = storage.getCurrentRoute();
      const prevQuery = parseQueryString(prevRoute.queryString ?? "");
      const newQuery = merge ? { ...prevQuery, ...query } : query;
      const route = {
        queryString: buildQueryString(newQuery),
      };
      if (push) {
        storage.pushRoute(route);
      } else {
        storage.replaceRoute(route);
      }
    };

    return [currentQuery, setQuery];
  }, [storage, currentRoute.queryString]);
}
