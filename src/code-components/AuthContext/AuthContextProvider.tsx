import { ReactNode } from "react";
import { DynamicAuth } from "./DynamicAuth";
import { AuthContextValue, StaticAuth } from "./StaticAuth";

export interface AuthContextProviderProps extends Partial<AuthContextValue> {
  children: ReactNode;
}

export function AuthContextProvider({
  userId,
  departmentId,
  roleName,
  features,
  privileges,
  children,
}: AuthContextProviderProps) {
  if (!userId || !departmentId || !roleName || !features || !privileges) {
    return <DynamicAuth>{children}</DynamicAuth>;
  }

  return (
    <StaticAuth
      {...{
        userId,
        departmentId,
        roleName,
        features,
        privileges,
        children,
      }}
    />
  );
}
