import { CSSProperties, ReactNode } from "react";
import { VList } from "virtua";

interface VirtualScrollProviderProps {
  style?: CSSProperties;
  children: ReactNode[];
}

export default function VirtualScrollProvider({
  style,
  children,
}: VirtualScrollProviderProps) {
  return <VList style={style}>{children}</VList>;
}
