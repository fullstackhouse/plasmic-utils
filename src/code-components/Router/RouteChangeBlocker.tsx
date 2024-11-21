import { DataProvider } from "@plasmicapp/react-web/lib/host";
import { ReactNode } from "react";

export interface RouteChangeBlockerProps {
  name: string;
  children: ReactNode;
}

export interface BlockerContext {
  state: BlockerState;
  // TODO blocked route
  proceed(): void;
  reset(): void;
}

export type BlockerState = "unblocked" | "blocked";

export function RouteChangeBlocker({
  name,
  children,
}: RouteChangeBlockerProps) {
  // TODO
  const blocker: BlockerContext = {
    state: "unblocked",
    proceed() {},
    reset() {},
  };

  return (
    <DataProvider name={name} data={blocker}>
      {children}
    </DataProvider>
  );
}
