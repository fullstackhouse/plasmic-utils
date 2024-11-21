import { useMemo } from "react";
import { RouterController } from "./controller/useRouterController";
import { Route } from "./storage/base";
import { useRoute } from "./useRoute";
import { buildQueryString, parseQueryString } from "./utils/queryString";

export type Query = Record<string, string>;
export type SetQuery = (
  query: Record<string, string | null>,
  options?: {
    /**
     * @default true
     */
    merge?: boolean;
    /**
     * @default false
     */
    push?: boolean;
  },
) => Promise<void>;

export function useQuery(controller: RouterController): [Query, SetQuery] {
  const { blockers, storage } = controller;
  const route = useRoute(controller.storage);

  return useMemo(() => {
    const currentQuery = parseQueryString(route.queryString ?? "");

    const setQuery: SetQuery = async (
      query,
      { merge = true, push = false } = {},
    ) => {
      const prevRoute = storage.getRoute();
      const prevQuery = parseQueryString(prevRoute.queryString ?? "");
      const nextQuery = merge ? { ...prevQuery, ...query } : query;
      const nextRoute: Route = {
        queryString: buildQueryString(nextQuery),
      };

      const blocked = await blockers.isBlocking(nextRoute);
      if (blocked) {
        return;
      }

      if (push) {
        storage.pushRoute(nextRoute);
      } else {
        storage.replaceRoute(nextRoute);
      }
    };

    return [currentQuery, setQuery];
  }, [route.queryString, storage, blockers]);
}
