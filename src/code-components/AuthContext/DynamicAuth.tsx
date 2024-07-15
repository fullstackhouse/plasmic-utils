import { useDataEnv } from "@plasmicapp/loader-react";
import isEqual from "lodash.isequal";
import { ReactNode, useMemo } from "react";
import {
  getSessionStorageObject,
  setSessionStorageObject,
} from "../../common/sessionStorage";
import { ApiProvider } from "../ApiProvider/ApiProvider";
import { AuthContextValue, StaticAuth } from "./StaticAuth";
import { convertPrivileges } from "./convertPrivileges";

interface ApiAuthBody {
  userId: string;
  departmentId: string;
  roleName: string;
  features: string[];
  privileges: string;
}

interface DynamicAuthProps {
  children: ReactNode;
}

const apiCtxName = "__auth";
const storageKey = "__myevals-react-frontend-auth";

export function DynamicAuth({ children }: DynamicAuthProps) {
  const isLocalhost =
    typeof window !== "undefined" &&
    window.location.href.startsWith("http://localhost");

  return (
    <ApiProvider
      enabled
      name={apiCtxName}
      path="/auth"
      refetchIfStale={false}
      alertOnError={!isLocalhost}
    >
      <DynamicAuthContent {...{ children }} />
    </ApiProvider>
  );
}

function DynamicAuthContent({ children }: DynamicAuthProps) {
  const $ctx = useDataEnv();
  const fetchedData = $ctx![apiCtxName].data as ApiAuthBody | null;

  const data = useMemo((): AuthContextValue | null => {
    const cachedData = getSessionStorageObject<ApiAuthBody>(storageKey);
    if (fetchedData && !isEqual(fetchedData, cachedData)) {
      setSessionStorageObject(storageKey, fetchedData);
    }
    const actualData = fetchedData ?? cachedData;

    return (
      actualData && {
        ...actualData,
        privileges: convertPrivileges(JSON.stringify(actualData.privileges)),
      }
    );
  }, [fetchedData]);

  if (!data) {
    return (
      <p style={{ backgroundColor: "black", color: "white", padding: 8 }}>
        Authenticating...
      </p>
    );
  }

  return (
    <StaticAuth
      {...{
        ...data,
      }}
    >
      {children}
    </StaticAuth>
  );
}
