import React, { CSSProperties, ReactNode } from "react";

interface RawTdProps {
  id?: string;
  colSpan: number;
  rowSpan: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function RawTd({
  id,
  colSpan,
  rowSpan,
  className,
  style,
  children,
}: RawTdProps) {
  return (
    <td
      id={id}
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={className}
      style={style}
    >
      {children}
    </td>
  );
}
