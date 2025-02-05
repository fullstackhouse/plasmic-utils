import {
  DataContext,
  DataProviderProps,
  mkMetaName,
  mkMetaValue,
  useDataEnv,
} from "@plasmicapp/react-web/lib/host";
import { useMemo } from "react";

interface MemoDataProviderProps extends DataProviderProps {
  memoKey?: string;
}

export function MemoDataProvider<T>({
  name,
  data,
  memoKey,
  hidden,
  advanced,
  label,
  children,
}: MemoDataProviderProps) {
  const parentContext = useDataEnv() ?? {};
  const actualMemoKey = memoKey ?? JSON.stringify(data);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedData = useMemo(() => data, [actualMemoKey]);

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
