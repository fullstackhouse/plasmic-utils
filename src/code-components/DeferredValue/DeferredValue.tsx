import { DataProvider } from "@plasmicapp/react-web/lib/host";
import { ReactNode, useDeferredValue } from "react";

interface DeferredValueProps {
  name: string;
  value: unknown;
  children: ReactNode;
}

export function DeferredValue({ name, value, children }: DeferredValueProps) {
  const deferredValue = useDeferredValue(value);

  return (
    <DataProvider
      name={name}
      data={{
        pending: deferredValue !== value,
        current: deferredValue,
      }}
    >
      {children}
    </DataProvider>
  );
}
