import {
  Combobox as HeadlessCombobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Fragment, useRef, useState, ReactNode } from "react";

import { MemoDataProvider } from "../MemoDataProvider/MemoDataProvider";
import styles from "./Combobox.module.css";
import { HighlightQueryValue } from "./HighlightQueryValue";
import { groupOptions } from "./utils";
import { limitOptions } from "./limitOptions";
import { filterOptionGroupsByQuery } from "./filterOptionGroupsByQuery";

const MAX_OPTIONS_DISPLAY = 500;

type ComboboxValue = string | number;

interface ComboboxProps {
  value?: ComboboxValue;
  emptyOptionText?: string;
  typeToSearchText?: string;
  leftIcon: ReactNode;
  rightIcon: ReactNode;
  footer?: ReactNode;
  options?: ComboboxOption[];
  optionLeftIcon?: ReactNode;
  disabled?: boolean;
  /**
   * Placement of the dropdown menu relative to the input, forwarded to Headless
   * UI's `anchor` prop. The menu is portalled to the document body and kept in
   * the viewport by Floating UI, so it can be wider than the input without being
   * clipped by an overflow ancestor. Defaults to `"bottom start"`.
   */
  menuPlacement?:
    | "top"
    | "top start"
    | "top end"
    | "bottom"
    | "bottom start"
    | "bottom end";
  /**
   * How wide the dropdown menu is.
   * - `"input"` (default): exactly as wide as the input.
   * - `"fit"`: grows to the widest option (so long labels don't wrap), never
   *   narrower than the input.
   *
   * `width` / `min-width` are applied inline so they win over any `width` left in
   * `optionsClassName`. `max-width` is left entirely to CSS — set your own cap on
   * the options element via `optionsClassName` if you want one. Without a cap the
   * menu is still kept inside the viewport by Floating UI.
   */
  menuWidth?: "input" | "fit";
  "aria-label"?: string;
  "aria-labelledby"?: string;
  placeholder?: string;
  className?: string;
  leftIconClassName?: string;
  rightIconClassName?: string;
  inputClassName?: string;
  inputWrapperClassName?: string;
  emptyOptionClassName?: string;
  optionsClassName?: string;
  optionClassName?: string;
  optionLeftIconClassName?: string;
  optionContentClassName?: string;
  groupClassName?: string;
  labelClassName?: string;
  searchValueClassName?: string;
  typeToSearchClassName?: string;
  descriptionClassName?: string;
  arrowIconClassName?: string;
  onChange?(value: ComboboxValue | null): void;
}

export interface ComboboxOption {
  label?: string;
  description?: string;
  value: ComboboxValue;
  highlight?: boolean;
  group?: string;
  disabled?: boolean;
}

export interface OptionGroup {
  name?: string;
  options: ComboboxOption[];
}

export function Combobox({
  value,
  emptyOptionText,
  typeToSearchText,
  leftIcon,
  rightIcon,
  footer,
  options,
  optionLeftIcon,
  disabled,
  menuPlacement = "bottom start",
  menuWidth = "input",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  placeholder,
  onChange,
  className,
  leftIconClassName,
  rightIconClassName,
  inputClassName,
  inputWrapperClassName,
  emptyOptionClassName,
  optionsClassName,
  optionClassName,
  optionLeftIconClassName,
  optionContentClassName,
  groupClassName,
  labelClassName,
  searchValueClassName,
  typeToSearchClassName,
  descriptionClassName,
  arrowIconClassName,
}: ComboboxProps) {
  const [query, setQuery] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  // `width` / `min-width` are inline so they beat any leftover `width` on
  // `optionsClassName` (e.g. a `width: 100%` from the design tool). `max-width`
  // is deliberately left to CSS so it stays overridable via `optionsClassName`.
  const optionsStyle =
    menuWidth === "fit"
      ? { width: "max-content", minWidth: "var(--input-width)" }
      : { width: "var(--input-width)" };

  const optionGroups = groupOptions(options ?? []);
  const visibleOptionGroups = filterOptionGroupsByQuery(optionGroups, query);

  const selectedOption = options?.find((option) => option.value === value);

  const { optionGroups: limitedOptionGroups, limited: overLimit } =
    limitOptions(visibleOptionGroups, MAX_OPTIONS_DISPLAY);

  return (
    <div className={className}>
      <HeadlessCombobox
        immediate
        disabled={disabled}
        value={selectedOption ?? null}
        onChange={(option: ComboboxOption | null) =>
          onChange?.(option ? option.value : null)
        }
        onClose={() => setQuery("")}
      >
        {({ open }) => (
          <div className={[inputWrapperClassName, styles.wrapper].join(" ")}>
            <div className={[styles.leftIcon, leftIconClassName].join(" ")}>
              {leftIcon}
            </div>
            <ComboboxInput
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              // `immediate` opens the menu on focus. We still handle click so
              // that clicking an already-focused input (e.g. right after
              // selecting an option) reopens the menu.
              onClick={() => {
                if (!open) {
                  buttonRef.current?.click();
                }
              }}
              onFocus={(event) => {
                event.currentTarget.select();
                event.currentTarget.setSelectionRange(
                  0,
                  event.currentTarget.value.length,
                );
              }}
              displayValue={(option: ComboboxOption | null) => {
                return option ? (option.label ?? String(option.value)) : "";
              }}
              className={[inputClassName, styles.input].join(" ")}
              placeholder={placeholder}
              autoComplete="off"
              spellCheck="false"
              aria-labelledby={ariaLabelledBy}
              aria-label={ariaLabel}
              // Hide 1password autocomplete
              // ( https://1password.community/discussion/117501/as-a-web-developer-how-can-i-disable-1password-filling-for-a-specific-field/p4 )
              data-1p-ignore
            />
            <div className={[styles.rightIcon, rightIconClassName].join(" ")}>
              {rightIcon}
            </div>
            <ComboboxButton
              ref={buttonRef}
              className={[
                styles.arrowIcon,
                arrowIconClassName,
                open ? styles.rotate : "",
              ].join(" ")}
              style={{
                pointerEvents: open ? "none" : undefined,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 9"
                height="1em"
                width="1em"
              >
                <path
                  d="M6.988 8.012a1 1 0 01-.707-.293l-6-6A1 1 0 011.695.305l5.293 5.293L12.28.305a1 1 0 111.414 1.414l-6 6a1 1 0 01-.707.293z"
                  fill="#767676"
                ></path>
              </svg>
            </ComboboxButton>
            <ComboboxOptions
              // `gap: 1` matches the old `margin: 1px` offset; `padding: 8`
              // keeps the menu 8px clear of the viewport edge when it shifts.
              anchor={{ to: menuPlacement, gap: 1, padding: 8 }}
              transition
              className={styles.positioner}
            >
              {/*
               * Inner wrapper carries all sizing + look. Headless UI's `anchor`
               * writes an inline `max-width: <viewport>px` (Floating UI `size`
               * middleware) onto the positioned element on every reposition,
               * which would override a caller's `max-width`. That element is the
               * `ComboboxOptions` above; this wrapper is untouched by it.
               */}
              <div
                style={optionsStyle}
                className={[styles.options, optionsClassName].join(" ")}
              >
                {visibleOptionGroups.length === 0 ? (
                  <p className={emptyOptionClassName}>{emptyOptionText}</p>
                ) : (
                  limitedOptionGroups.map(({ name, options }) => (
                    <Fragment key={name || "noGroup"}>
                      {name && (
                        <div className={groupClassName} role="presentation">
                          <HighlightQueryValue
                            text={name}
                            query={query}
                            queryClassName={searchValueClassName}
                          />
                        </div>
                      )}
                      {options.map((option, optionIndex) => (
                        <ComboboxOption
                          key={optionIndex}
                          value={option}
                          disabled={option.disabled}
                          data-highlight={option.highlight ? "true" : undefined}
                          className={optionClassName}
                        >
                          {optionLeftIcon ? (
                            <MemoDataProvider
                              name="option"
                              data={option}
                              deps={[option]}
                            >
                              <div className={optionLeftIconClassName}>
                                {optionLeftIcon}
                              </div>
                            </MemoDataProvider>
                          ) : null}
                          <div className={optionContentClassName}>
                            <p className={labelClassName}>
                              <HighlightQueryValue
                                text={option.label ?? String(option.value)}
                                query={query}
                                queryClassName={searchValueClassName}
                              />
                            </p>
                            {option.description ? (
                              <p
                                data-highlight={
                                  option.highlight ? "true" : undefined
                                }
                                className={descriptionClassName}
                              >
                                <HighlightQueryValue
                                  text={option.description}
                                  query={query}
                                  queryClassName={searchValueClassName}
                                />
                              </p>
                            ) : null}
                          </div>
                        </ComboboxOption>
                      ))}
                    </Fragment>
                  ))
                )}
                {overLimit && (
                  <p className={typeToSearchClassName}>{typeToSearchText}</p>
                )}
                {footer && <div>{footer}</div>}
              </div>
            </ComboboxOptions>
          </div>
        )}
      </HeadlessCombobox>
    </div>
  );
}
