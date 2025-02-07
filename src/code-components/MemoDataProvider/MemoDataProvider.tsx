import {
  DataContext,
  DataProviderProps,
  mkMetaName,
  mkMetaValue,
  useDataEnv,
} from "@plasmicapp/react-web/lib/host";
import { useMemo } from "react";

interface MemoDataProviderProps extends DataProviderProps {
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedData = useMemo(() => data, deps);

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
