import { useMemo } from "react";
import { Route, RouteStorage } from "./storage/base";
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
      const nextQuery = merge ? { ...prevQuery, ...query } : query;
      const nextRoute: Route = {
        queryString: buildQueryString(nextQuery),
      };

      // TODO blockers

      if (push) {
        storage.pushRoute(nextRoute);
      } else {
        storage.replaceRoute(nextRoute);
      }
    };

    return [currentQuery, setQuery];
  }, [storage, currentRoute.queryString]);
}
