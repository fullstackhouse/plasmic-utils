import React, { CSSProperties, ReactNode } from "react";

interface RawTbodyProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function RawTbody({ className, style, children }: RawTbodyProps) {
  return (
    <tbody className={className} style={style}>
      {children}
    </tbody>
  );
}
