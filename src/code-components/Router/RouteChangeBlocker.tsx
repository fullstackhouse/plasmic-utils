import { DataProvider } from "@plasmicapp/react-web/lib/host";
import {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Route } from "./storage/base";
import { BlockersContext } from "./controller/useBlockers";

export interface RouteChangeBlockerProps {
  name?: string;
  children: ReactNode;
}

export interface RouteChangeBlockerContext {
  state: BlockerState;
  blockedRoute: Route | null;
  proceed(): void;
  reset(): void;
}

export type BlockerState = "unblocked" | "blocked";

export function RouteChangeBlocker({
  name = "blocker",
  children,
}: RouteChangeBlockerProps) {
  const blockers = useContext(BlockersContext);
  const [blockedRoute, setBlockedRoute] = useState<Route | null>(null);
  const resolveBlock = useRef<((blocked: boolean) => void) | null>(null);

  useEffect(() => {
    const { deregister } = blockers.registerBlocker({
      check(route) {
        setBlockedRoute(route);
        return new Promise((resolve) => {
          resolveBlock.current = resolve;
        });
      },
    });
    return deregister;
  }, [blockers]);

  const blocker: RouteChangeBlockerContext = useMemo(() => {
    if (!blockedRoute) {
      return {
        state: "unblocked",
        blockedRoute,
        proceed() {},
        reset() {},
      };
    }

    return {
      state: "blocked",
      blockedRoute,
      proceed() {
        resolveBlock.current?.(false);
        setBlockedRoute(null);
      },
      reset() {
        resolveBlock.current?.(true);
        setBlockedRoute(null);
      },
    };
  }, [blockedRoute]);

  return (
    <DataProvider name={name} data={blocker}>
      {children}
    </DataProvider>
  );
}
