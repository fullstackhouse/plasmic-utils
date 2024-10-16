import { CSSProperties, ReactNode } from "react";
import { VList } from "virtua";

interface VirtualScrollProps {
  style?: CSSProperties;
  className?: string;
  children: ReactNode[];
}

export default function VirtualScroll({
  style,
  className,
  children,
}: VirtualScrollProps) {
  return (
    <VList className={className} style={style}>
      {children}
    </VList>
  );
}
