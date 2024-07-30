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

export type SeverityLevel =
  | "fatal"
  | "error"
  | "warning"
  | "log"
  | "info"
  | "debug";

export interface Breadcrumb {
  type?: string;
  level?: SeverityLevel;
  event_id?: string;
  category?: string;
  message?: string;
  data?: {
    [key: string]: any;
  };
  timestamp?: number;
}

export interface Sentry {
  addBreadcrumb(breadcrumb: Breadcrumb): void;
  setTags(tags: Record<string, Primitive>): void;
  setUser(user: User | null): void;
}

export const SentryContext = createContext<Sentry | null>(null);
