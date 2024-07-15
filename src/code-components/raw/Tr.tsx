import React, { CSSProperties, MouseEventHandler, ReactNode } from "react";

interface RawTrProps {
  className?: string;
  style?: CSSProperties;
  onMouseEnter?: MouseEventHandler<HTMLTableRowElement>;
  onMouseLeave?: MouseEventHandler<HTMLTableRowElement>;
  children: ReactNode;
}

export function RawTr({
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  children,
}: RawTrProps) {
  return (
    <tr
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </tr>
  );
}
