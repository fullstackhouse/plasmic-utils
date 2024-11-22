import { useMemo } from "react";
import { RouterController } from "./controller/useRouterController";
import { Query, SetQuery, useQuery } from "./useQuery";

export interface RouteContext extends RouterActions {
  query: Query;
}

export interface RouterActions {
  setQuery: SetQuery;
}

export function useRouterContext(controller: RouterController): {
  route: RouteContext;
  actions: RouterActions;
} {
  const [query, setQuery] = useQuery(controller);

  return useMemo(
    () => ({
      route: {
        query,
        setQuery,
      },
      actions: {
        setQuery,
      },
    }),
    [query, setQuery],
  );
}
