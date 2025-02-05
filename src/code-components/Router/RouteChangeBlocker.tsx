import {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MemoDataProvider } from "../MemoDataProvider/MemoDataProvider";
import { BlockersContext } from "./controller/useBlockers";
import { Route } from "./storage/base";

export interface RouteChangeBlockerProps {
  name?: string;
  enabled?: boolean;
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
  enabled = true,
  children,
}: RouteChangeBlockerProps) {
  const blockers = useContext(BlockersContext);
  const [blockedRoute, setBlockedRoute] = useState<Route | null>(null);
  const resolveBlock = useRef<((blocked: boolean) => void) | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const { deregister } = blockers.registerBlocker({
      check(route) {
        setBlockedRoute(route);
        return new Promise((resolve) => {
          resolveBlock.current = resolve;
        });
      },
    });
    return deregister;
  }, [enabled, blockers]);

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
    <MemoDataProvider name={name} data={blocker} memoKey={blocker}>
      {children}
    </MemoDataProvider>
  );
}
