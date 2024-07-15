import React, { CSSProperties, ReactNode } from "react";

interface RawOlProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function RawOl({ className, style, children }: RawOlProps) {
  return (
    <ol className={className} style={style}>
      {children}
    </ol>
  );
}
