import { ContextType, createContext, ReactNode } from "react";

export const ApiContext = createContext<{
  clientId?: string;
}>({});

export function ApiContextProvider({
  clientId,
  children,
}: ContextType<typeof ApiContext> & { children: ReactNode }): ReactNode {
  return (
    <ApiContext.Provider value={{ clientId }}>{children}</ApiContext.Provider>
  );
}
