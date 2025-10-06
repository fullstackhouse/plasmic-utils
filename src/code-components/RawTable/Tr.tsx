import React, { CSSProperties, MouseEventHandler, ReactNode } from "react";

interface RawTrProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  onMouseEnter?: MouseEventHandler<HTMLTableRowElement>;
  onMouseLeave?: MouseEventHandler<HTMLTableRowElement>;
  children: ReactNode;
}

export function RawTr({
  id,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  children,
}: RawTrProps) {
  return (
    <tr
      id={id}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </tr>
  );
}
