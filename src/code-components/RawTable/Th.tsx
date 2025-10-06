import React, { CSSProperties, ReactNode } from "react";

interface RawThProps {
  id?: string;
  colSpan: number;
  rowSpan: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function RawTh({
  id,
  colSpan,
  rowSpan,
  className,
  style,
  children,
}: RawThProps) {
  return (
    <th
      id={id}
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={className}
      style={style}
    >
      {children}
    </th>
  );
}
