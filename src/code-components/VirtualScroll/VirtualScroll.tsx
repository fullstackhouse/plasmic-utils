import { CSSProperties, ReactNode } from "react";
import { VList } from "virtua";

interface VirtualScrollListProps {
  style?: CSSProperties;
  className?: string;
  children: ReactNode[];
}

export function VirtualScrollList({
  style,
  className,
  children,
}: VirtualScrollListProps) {
  return (
    <VList className={className} style={style}>
      {children}
    </VList>
  );
}
