import { ContextType, createContext, ReactNode, useMemo } from "react";
import { ApiMiddleware } from "./middlewares/middleware";
import { jsonApiMiddleware } from "./middlewares/json";

export const ApiContext = createContext<{
  middlewares: Record<string, ApiMiddleware>;
}>({ middlewares: { json: jsonApiMiddleware } });

export interface ApiContextProviderProps {
  middlewares?: ApiMiddleware[];
  children: ReactNode;
}

export function ApiContextProvider({
  middlewares,
  children,
}: ApiContextProviderProps): ReactNode {
  const context: ContextType<typeof ApiContext> = useMemo(
    () => ({
      middlewares: Object.fromEntries<ApiMiddleware>(
        (middlewares ?? [jsonApiMiddleware]).map((m) => [m.name, m]),
      ),
    }),
    [middlewares],
  );

  return <ApiContext.Provider value={context}>{children}</ApiContext.Provider>;
}
