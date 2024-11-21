import {
  DataProvider,
  GlobalActionsProvider,
} from "@plasmicapp/react-web/lib/host";
import { ReactNode, useMemo } from "react";
import { Query } from "./utils/queryString";
import { RouteStorageType, useStorage } from "./storage/useStorage";
import { useQuery } from "./useQuery";

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
  const [query, setQuery] = useQuery(storageRef);

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
