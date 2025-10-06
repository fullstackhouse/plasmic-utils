import React, { CSSProperties, ReactNode } from "react";

interface RawTableProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function RawTable({ id, className, style, children }: RawTableProps) {
  return (
    <table
      id={id}
      className={className}
      style={{ borderCollapse: "collapse", ...style }}
    >
      {children}
    </table>
  );
}
