import { ContextType, createContext, ReactNode } from "react";

export const ApiContext = createContext<{
  clientId?: string;
}>({});

export function ApiContextProvider({
  children,
  ...context
}: ContextType<typeof ApiContext> & { children: ReactNode }): ReactNode {
  return <ApiContext.Provider value={context}>{children}</ApiContext.Provider>;
}
