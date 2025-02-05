import { ReactNode, useMemo } from "react";

interface MemoChildrenProps {
  memoKey?: unknown | unknown[];
  children?: ReactNode;
}

export function MemoChildren<T>({ memoKey, children }: MemoChildrenProps) {
  const actualMemoKeys = Array.isArray(memoKey) ? memoKey : [memoKey];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedChildren = useMemo(() => children, actualMemoKeys);

  return <>{memoizedChildren}</>;
}
