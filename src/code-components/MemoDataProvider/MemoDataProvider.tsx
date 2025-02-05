import {
  DataContext,
  DataProviderProps,
  mkMetaName,
  mkMetaValue,
  useDataEnv,
} from "@plasmicapp/react-web/lib/host";
import { useMemo } from "react";

interface MemoDataProviderProps extends DataProviderProps {
  memoKey?: (string | number) | (string | number)[];
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
  const actualMemoKeys =
    memoKey == null
      ? [JSON.stringify(data)]
      : Array.isArray(memoKey)
        ? memoKey
        : [memoKey];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedData = useMemo(() => data, actualMemoKeys);

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
