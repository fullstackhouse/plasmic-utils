import { createContext, useMemo, useRef } from "react";
import { Route } from "../storage/base";

export interface Blocker {
  check(route: Route): Promise<boolean>;
}

export interface Blockers {
  registerBlocker(blocker: Blocker): { deregister: () => void };
  isBlocking(route: Route): Promise<boolean>;
}

export const BlockersContext = createContext<Blockers>({
  registerBlocker() {
    throw new Error("Blockers context not provided");
  },
  isBlocking() {
    throw new Error("Blockers context not provided");
  },
});

export function useBlockers(): Blockers {
  const registrationsRef = useRef<Blocker[]>([]);

  const blockers = useMemo<Blockers>(
    () => ({
      registerBlocker(blocker: Blocker) {
        registrationsRef.current.push(blocker);
        return {
          deregister() {
            registrationsRef.current = registrationsRef.current.filter(
              (b) => b !== blocker,
            );
          },
        };
      },

      async isBlocking(route) {
        for await (const blocker of registrationsRef.current) {
          const blocked = await blocker.check(route);
          if (blocked) {
            return true;
          }
        }
        return false;
      },
    }),
    [],
  );

  return blockers;
}
