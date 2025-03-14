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
    /**
     * @default false
     */
    force?: boolean;
  },
) => Promise<void>;

export function useQuery(controller: RouterController): [Query, SetQuery] {
  const { blockers, storage } = controller;
  const route = useRoute(controller.storage);

  return useMemo(() => {
    const currentQuery = parseQueryString(route.queryString ?? "");

    const setQuery: SetQuery = async (
      query,
      { merge = true, push = false, force = false } = {},
    ) => {
      function getNextRoute() {
        const prevRoute = storage.getRoute();
        const prevQuery = parseQueryString(prevRoute.queryString ?? "");
        const nextQuery = merge ? { ...prevQuery, ...query } : query;
        const nextRoute: Route = {
          queryString: buildQueryString(nextQuery),
        };
        return nextRoute;
      }

      if (!force) {
        const blocked = await blockers.isBlocking(getNextRoute());
        if (blocked) {
          return;
        }
      }

      // We have to build it again here.
      // In case there are multiple route changes in parallel, with `merge: true`,
      // and because blocker is async,
      // we may need to rebuild the next route right before sending it to storage,
      // as `prevRoute = storage.getRoute()` may have changed in the meantime.
      const nextRoute = getNextRoute();
      if (push) {
        storage.pushRoute(nextRoute);
      } else {
        storage.replaceRoute(nextRoute);
      }
    };

    return [currentQuery, setQuery];
  }, [route.queryString, storage, blockers]);
}
