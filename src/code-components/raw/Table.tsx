import React, { CSSProperties, ReactNode } from "react";

interface RawTableProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function RawTable({ className, style, children }: RawTableProps) {
  return (
    <table
      className={className}
      style={{ borderCollapse: "collapse", ...style }}
    >
      {children}
    </table>
  );
}
