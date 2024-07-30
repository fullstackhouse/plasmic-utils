import {
  DataProvider,
  GlobalActionsProvider,
} from "@plasmicapp/react-web/lib/host";
import { ReactNode, useLayoutEffect, useMemo, useState } from "react";
import { useInPlasmic } from "../../common/useInPlasmic";
import { Route, RouterAdapter } from "./adapters/base";
import { buildBrowserRouterAdapter } from "./adapters/browser";
import { buildMemoryRouterAdapter } from "./adapters/memory";
import { Query, buildQueryString, parseQueryString } from "./utils/queryString";

export interface RouterProps {
  initialQueryString?: string;
  children: ReactNode;
}

export interface RouterContextValue extends RouterActions {
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

export function Router({ initialQueryString, children }: RouterProps) {
  const adapterRef = useAdapter({ initialQueryString });
  const [query, setQuery] = useCurrentQuery(adapterRef);

  const { context, actions } = useMemo(() => {
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

function useAdapter({
  initialQueryString,
}: Pick<RouterProps, "initialQueryString">): RouterAdapter {
  const inPlasmic = useInPlasmic();

  const adapter: RouterAdapter = useMemo(() => {
    return inPlasmic || typeof window === "undefined"
      ? buildMemoryRouterAdapter({ initialQueryString })
      : buildBrowserRouterAdapter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return adapter;
}

function useCurrentQuery(
  adapter: RouterAdapter,
): [Query, RouterActions["setQuery"]] {
  const currentRoute = useCurrentRoute(adapter);

  return useMemo(() => {
    const currentQuery = parseQueryString(currentRoute.queryString ?? "");

    const setQuery: RouterActions["setQuery"] = (
      query,
      { merge = true, push = false } = {},
    ) => {
      const prevRoute = adapter.getCurrentRoute();
      const prevQuery = parseQueryString(prevRoute.queryString ?? "");
      const newQuery = merge ? { ...prevQuery, ...query } : query;
      const route = {
        queryString: buildQueryString(newQuery),
      };
      if (push) {
        adapter.pushRoute(route);
      } else {
        adapter.replaceRoute(route);
      }
    };

    return [currentQuery, setQuery];
  }, [adapter, currentRoute.queryString]);
}

function useCurrentRoute(adapter: RouterAdapter): Route {
  const [currentRoute, setCurrentRoute] = useState(adapter.getCurrentRoute());

  useLayoutEffect(() => {
    adapter.onRouteChange(setCurrentRoute);

    return () => {
      adapter.destroy();
    };
  }, [adapter]);

  return currentRoute;
}
