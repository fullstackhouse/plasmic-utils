import { DataProvider } from "@plasmicapp/host";
import { ReactNode, useContext, useEffect, useMemo } from "react";
import { LogoutContextProvider } from "./LogoutProvider/LogoutContextProvider";
import { SentryContext } from "../../sentry/SentryContext";

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
  const sentry = useContext(SentryContext);
  const auth = useMemo(
    () => ({
      userId,
      departmentId,
      roleName,
      features,
      privileges,
    }),
    [userId, departmentId, roleName, features, privileges],
  );

  useEffect(() => {
    sentry?.setUser({
      id: auth.userId,
    });
    sentry?.setTags({
      department: auth.departmentId,
    });
  }, [sentry, auth.userId, auth.departmentId]);

  return (
    <DataProvider name="auth" data={auth}>
      <LogoutContextProvider>{children}</LogoutContextProvider>
    </DataProvider>
  );
}
