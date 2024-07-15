import styles from "./HiddenIfEmptyContainer.module.css";
import React, { CSSProperties, ReactNode } from "react";

export function HiddenIfEmptyContainer({
  style,
  className,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div className={[className, styles.main].join(" ")} style={style}>
      {children}
    </div>
  );
}
