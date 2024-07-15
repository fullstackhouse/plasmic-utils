import { createContext } from "react";

export const LogoutContext = createContext<{
  pending: boolean;
  call(): Promise<void>;
  addListener(callback: LogoutListener): void;
  removeListener(callback: LogoutListener): void;
}>({
  pending: false,
  async call() {},
  addListener() {},
  removeListener() {},
});

export type LogoutListener = (event: LogoutEvent) => void | Promise<void>;

export interface LogoutEvent {
  defaultPrevented: boolean;
  isAutoSave: boolean;
  preventDefault(): void;
}
