import { CSSProperties, ReactNode } from "react";
import { VList } from "virtua";

interface VirtualScrollProps {
  style?: CSSProperties;
  children: ReactNode[];
}

export default function VirtualScroll({ style, children }: VirtualScrollProps) {
  return <VList style={style}>{children}</VList>;
}
