import React, { CSSProperties, MouseEventHandler, ReactNode } from "react";

interface TextLinkOrButtonProps {
  href?: string;
  className: string;
  themeResetClass: string;
  disabled: boolean;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children: ReactNode;
}

export function TextLinkOrButton({
  href,
  className,
  themeResetClass,
  disabled,
  style,
  onClick,
  children,
}: TextLinkOrButtonProps) {
  return (
    <a
      href={href || "#"}
      role={href ? undefined : "button"}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={`${className} ${themeResetClass}`}
      style={{ cursor: disabled ? "default" : "pointer", ...style }}
      onClick={
        href
          ? onClick
          : (event) => {
              event.preventDefault();
              event.stopPropagation();
              onClick?.(event);
            }
      }
    >
      {children}
    </a>
  );
}
