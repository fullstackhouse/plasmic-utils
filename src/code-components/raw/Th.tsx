import React, { CSSProperties, ReactNode } from "react";

interface RawThProps {
  colSpan: number;
  rowSpan: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function RawTh({
  colSpan,
  rowSpan,
  className,
  style,
  children,
}: RawThProps) {
  return (
    <th colSpan={colSpan} rowSpan={rowSpan} className={className} style={style}>
      {children}
    </th>
  );
}
