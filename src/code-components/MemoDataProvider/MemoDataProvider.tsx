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
  const childContext = useMemo(() => {
    if (!name) {
      return parentContext;
    }
    return {
      ...parentContext,
      [name]: data,
      [mkMetaName(name)]: mkMetaValue({ hidden, advanced, label }),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentContext, name, actualMemoKey]);

  return (
    <DataContext.Provider value={childContext}>{children}</DataContext.Provider>
  );
}
