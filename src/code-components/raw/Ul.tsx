import React, { CSSProperties, ReactNode } from "react";

interface RawUlProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function RawUl({ className, style, children }: RawUlProps) {
  return (
    <ul className={className} style={style}>
      {children}
    </ul>
  );
}
