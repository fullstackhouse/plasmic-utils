import { ReactNode } from "react";
import { useDebounce } from "use-debounce";
import { MemoDataProvider } from "../MemoDataProvider/MemoDataProvider";

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
    <MemoDataProvider
      name={name}
      data={debouncedValue}
      memoKey={debouncedValue}
    >
      {children}
    </MemoDataProvider>
  );
}
