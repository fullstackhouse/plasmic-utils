import { createContext } from "react";

export const ApiContext = createContext<{
  clientId?: string;
  clientVersion?: string;
}>({});

export const ApiContextProvider = ApiContext.Provider;
