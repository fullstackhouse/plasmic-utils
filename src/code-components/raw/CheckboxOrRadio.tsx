import { ChangeEvent, FocusEvent, ReactNode } from "react";
import styles from "./CheckboxOrRadio.module.css";

interface RawCheckboxOrRadioProps {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  onChange?(checked: ChangeEvent<HTMLInputElement>): void;
  onFocus?(checked: FocusEvent<HTMLInputElement>): void;
  onBlur?(checked: FocusEvent<HTMLInputElement>): void;
  children: ReactNode;
}

export function RawCheckboxOrRadio({
  type,
  name,
  value,
  checked,
  disabled,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  onChange,
  onFocus,
  onBlur,
  children,
}: RawCheckboxOrRadioProps) {
  return (
    <div className={styles.container}>
      {children}
      <input
        className={styles.input}
        {...{
          type,
          name,
          value,
          checked,
          disabled,
          "aria-label": ariaLabel,
          "aria-labelledby": ariaLabelledBy,
          onChange,
          onFocus,
          onBlur,
        }}
      />
    </div>
  );
}
