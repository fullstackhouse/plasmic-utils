import { useMemo } from "react";
import { Route, RouteStorage } from "../storage/base";
import { Blockers, useBlockers } from "./useBlockers";

export interface RouterController {
  storage: RouteStorage;
  blockers: Blockers;
}

export function useRouterController(storage: RouteStorage): RouterController {
  const blockers = useBlockers();

  return {
    storage,
    blockers,
  };
}
