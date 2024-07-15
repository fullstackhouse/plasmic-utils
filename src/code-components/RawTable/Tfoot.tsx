import React, { CSSProperties, ReactNode } from "react";

interface RawTfootProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function RawTfoot({ className, style, children }: RawTfootProps) {
  return (
    <tfoot className={className} style={style}>
      {children}
    </tfoot>
  );
}
