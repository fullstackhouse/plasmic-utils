import React, { CSSProperties, ReactNode } from "react";

interface RawTheadProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function RawThead({ className, style, children }: RawTheadProps) {
  return (
    <thead className={className} style={style}>
      {children}
    </thead>
  );
}
