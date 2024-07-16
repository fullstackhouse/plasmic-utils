import { createContext } from "react";

export type Primitive =
  | number
  | string
  | boolean
  | bigint
  | symbol
  | null
  | undefined;

export interface User {
  [key: string]: any;
  id?: string | number;
  ip_address?: string;
  email?: string;
  username?: string;
}

export interface Sentry {
  setTags(tags: Record<string, Primitive>): void;
  setUser(user: User | null): void;
}

export const SentryContext = createContext<Sentry | null>(null);
