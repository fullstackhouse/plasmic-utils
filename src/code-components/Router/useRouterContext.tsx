import { useMemo } from "react";
import { RouteStorage } from "./storage/base";
import { useQuery } from "./useQuery";

export interface RouteContext extends RouterActions {
  query: Record<string, string>;
}

export interface RouterActions {
  setQuery(
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
  ): void;
}

export function useRouterContext(storage: RouteStorage): {
  route: RouteContext;
  actions: RouterActions;
} {
  const [query, setQuery] = useQuery(storage);
  const { route, actions } = useMemo<{
    route: RouteContext;
    actions: RouterActions;
  }>(() => {
    return {
      route: {
        query,
        setQuery,
      },
      actions: {
        setQuery,
      },
    };
  }, [query, setQuery]);
  return { route, actions };
}
