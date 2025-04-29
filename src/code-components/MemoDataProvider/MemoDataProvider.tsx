import {
  DataContext,
  DataProviderProps,
  mkMetaName,
  mkMetaValue,
  useDataEnv,
} from "@plasmicapp/react-web/lib/host";
import { useMemo } from "react";

export interface MemoDataProviderProps extends DataProviderProps {
  deps?: unknown[];
}

const emptyDeps: unknown[] = [];

export function MemoDataProvider<T>({
  name,
  data,
  deps = emptyDeps,
  hidden,
  advanced,
  label,
  children,
}: MemoDataProviderProps) {
  const parentContext = useDataEnv();

  const memoizedData = useMemo(() => {
    if (process.env.NODE_ENV !== "production") {
      console.debug(`MemoDataProvider[name=${name}]#recalculateData()`, data);
    }

    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const childContext = useMemo(() => {
    if (!name) {
      return parentContext;
    }
    return {
      ...parentContext,
      [name]: memoizedData,
      [mkMetaName(name)]: mkMetaValue({ hidden, advanced, label }),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentContext, name, memoizedData]);

  return (
    <DataContext.Provider value={childContext}>{children}</DataContext.Provider>
  );
}
