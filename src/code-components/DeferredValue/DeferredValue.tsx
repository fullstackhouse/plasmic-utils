import isEqual from "lodash.isequal";
import { ReactNode, useDeferredValue } from "react";
import { MemoDataProvider } from "../MemoDataProvider/MemoDataProvider";

interface DeferredValueProps {
  name: string;
  value: unknown;
  children: ReactNode;
}

export function DeferredValue({ name, value, children }: DeferredValueProps) {
  const deferredValue = useDeferredValue(value);

  return (
    <MemoDataProvider
      name={name}
      data={{
        pending: !isEqual(deferredValue, value),
        current: deferredValue,
      }}
      memoKey={[deferredValue, value]}
    >
      {children}
    </MemoDataProvider>
  );
}
