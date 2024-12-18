import React, { ReactNode, useId } from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import styles from "./Switch.module.css";

export interface SwitchProps {
  className?: string;
  name: string;
  value: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  rootClassName: string;
  thumbClassName: string;
  onFocus?(): void;
  onBlur?(): void;
  onChange?(value: boolean): void;
  children: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export function Switch({
  className,
  name,
  value,
  checked,
  defaultChecked,
  disabled,
  rootClassName,
  thumbClassName,
  onFocus,
  onBlur,
  onChange,
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: SwitchProps) {
  const id = useId();
  const actualChecked = checked ?? defaultChecked;

  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
      className={className}
    >
      <RadixSwitch.Root
        id={id}
        name={name}
        value={value}
        checked={actualChecked}
        disabled={disabled}
        className={[styles.root, rootClassName].join(" ")}
        onCheckedChange={(val) => onChange?.(val)}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-checked={actualChecked}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        <RadixSwitch.Thumb
          className={[styles.thumb, thumbClassName].join(" ")}
        />
      </RadixSwitch.Root>
      <label htmlFor={id}>{children}</label>
    </div>
  );
}
