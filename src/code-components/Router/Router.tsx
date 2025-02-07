import { GlobalActionsProvider } from "@plasmicapp/react-web/lib/host";
import { ReactNode } from "react";
import { MemoDataProvider } from "../MemoDataProvider/MemoDataProvider";
import { BlockersContext } from "./controller/useBlockers";
import { useRouterController } from "./controller/useRouterController";
import { RouteStorageType, useStorage } from "./storage/useStorage";
import { RouterActions, useRouterContext } from "./useRouterContext";

export interface RouterProps {
  initialQueryString?: string;
  storage?: RouteStorageType;
  children: ReactNode;
}

export function Router({
  initialQueryString,
  storage: storageType,
  children,
}: RouterProps) {
  const storage = useStorage({ initialQueryString, type: storageType });
  const controller = useRouterController(storage);
  const { route, actions } = useRouterContext(controller);

  return (
    <BlockersContext.Provider value={controller.blockers}>
      <GlobalActionsProvider
        contextName="Router"
        actions={actions as Record<keyof RouterActions, Function>}
      >
        <MemoDataProvider name="route" data={route} deps={[route]}>
          {children}
        </MemoDataProvider>
      </GlobalActionsProvider>
    </BlockersContext.Provider>
  );
}
