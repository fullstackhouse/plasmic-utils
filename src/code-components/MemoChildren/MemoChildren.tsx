import { ReactNode, useMemo } from "react";

interface MemoChildrenProps {
  deps?: unknown[];
  children?: ReactNode;
}

const emptyDeps: unknown[] = [];

export function MemoChildren<T>({
  deps = emptyDeps,
  children,
}: MemoChildrenProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedChildren = useMemo(() => children, deps);

  return <>{memoizedChildren}</>;
}
