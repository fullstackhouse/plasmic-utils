import React, { CSSProperties, ReactNode } from "react";

interface RawLiProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function RawLi({ className, style, children }: RawLiProps) {
  return (
    <li className={className} style={style}>
      {children}
    </li>
  );
}
