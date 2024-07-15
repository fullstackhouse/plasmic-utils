import React, { ReactNode } from "react";

interface RawChildrenProps {
  children: ReactNode;
}

export function RawChildren({ children }: RawChildrenProps) {
  return <>{children}</>;
}
