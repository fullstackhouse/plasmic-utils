import { DataProvider } from "@plasmicapp/loader-nextjs";
// import * as Sentry from "@sentry/react";
import { ReactNode, useEffect, useMemo } from "react";
import { LogoutContextProvider } from "./LogoutProvider/LogoutContextProvider";

export interface StaticAuthProps extends AuthContextValue {
  children: ReactNode;
}

export interface AuthContextValue {
  userId: string;
  departmentId: string;
  roleName: string;
  features: string[];
  privileges: Record<string, string[]>;
}

export function StaticAuth({
  userId,
  departmentId,
  roleName,
  features,
  privileges,
  children,
}: StaticAuthProps) {
  const auth = useMemo(
    () => ({
      userId,
      departmentId,
      roleName,
      features,
      privileges,
    }),
    [userId, departmentId, roleName, features, privileges]
  );

  // TODO bring it back
  // useEffect(() => {
  //   Sentry.setUser({
  //     id: auth.userId,
  //   });
  //   Sentry.setTags({
  //     department: auth.departmentId,
  //   });
  // }, [auth.userId, auth.departmentId]);

  return (
    <DataProvider name="auth" data={auth}>
      <LogoutContextProvider>{children}</LogoutContextProvider>
    </DataProvider>
  );
}
