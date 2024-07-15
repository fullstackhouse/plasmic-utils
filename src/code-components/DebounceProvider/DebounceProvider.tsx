import { DataProvider } from "@plasmicapp/loader-nextjs";
import { ReactNode, useEffect } from "react";
import { useDebounce } from "use-debounce";

interface DebounceProviderProps<T = unknown> {
  name: string;
  value: T;
  delay: number;
  options?: {
    maxWait?: number;
    leading?: boolean;
    trailing?: boolean;
    equalityFn?: (left: T, right: T) => boolean;
  };
  children: ReactNode;
}

export function DebounceProvider<T>({
  name,
  value,
  delay,
  options,
  children,
}: DebounceProviderProps<T>) {
  const [debouncedValue] = useDebounce(value, delay, options);

  return (
    <DataProvider name={name} data={debouncedValue}>
      {children}
    </DataProvider>
  );
}
