import React, { CSSProperties, ReactNode } from "react";

interface RawTdProps {
  colSpan: number;
  rowSpan: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function RawTd({
  colSpan,
  rowSpan,
  className,
  style,
  children,
}: RawTdProps) {
  return (
    <td colSpan={colSpan} rowSpan={rowSpan} className={className} style={style}>
      {children}
    </td>
  );
}
