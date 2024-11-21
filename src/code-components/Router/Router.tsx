import {
  DataProvider,
  GlobalActionsProvider,
} from "@plasmicapp/react-web/lib/host";
import { ReactNode, useLayoutEffect, useMemo, useState } from "react";
import { Route, RouteStorage } from "./storage/base";
import { Query, buildQueryString, parseQueryString } from "./utils/queryString";
import { RouteStorageType, useStorage } from "./storage/useStorage";

export interface RouterProps {
  initialQueryString?: string;
  storage?: RouteStorageType;
  children: ReactNode;
}

export interface RouteContext extends RouterActions {
  query: Query;
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

export function Router({ initialQueryString, storage, children }: RouterProps) {
  const storageRef = useStorage({ initialQueryString, type: storage });
  const [query, setQuery] = useCurrentQuery(storageRef);

  const { context, actions } = useMemo<{
    context: RouteContext;
    actions: RouterActions;
  }>(() => {
    return {
      context: {
        query,
        setQuery,
      },
      actions: {
        setQuery,
      },
    };
  }, [query, setQuery]);

  return (
    <GlobalActionsProvider
      contextName="Router"
      actions={actions as Record<keyof RouterActions, Function>}
    >
      <DataProvider name="route" data={context}>
        {children}
      </DataProvider>
    </GlobalActionsProvider>
  );
}

function useCurrentQuery(
  storage: RouteStorage,
): [Query, RouterActions["setQuery"]] {
  const currentRoute = useCurrentRoute(storage);

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

function useCurrentRoute(storage: RouteStorage): Route {
  const [currentRoute, setCurrentRoute] = useState(storage.getCurrentRoute());

  useLayoutEffect(() => {
    storage.onRouteChange(setCurrentRoute);

    return () => {
      storage.destroy();
    };
  }, [storage]);

  return currentRoute;
}
