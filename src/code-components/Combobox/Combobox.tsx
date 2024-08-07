import { Combobox as HeadlessCombobox, Transition } from "@headlessui/react";
import { useState, useRef, Fragment, ReactNode } from "react";

import styles from "./Combobox.module.css";
import HighlightQueryValue from "./HighlightQueryValue";
import { groupOptions, optionGroupMatchesQuery } from "./utils";

type ComboboxValue = string | number;

interface ComboboxProps {
  value?: ComboboxValue;
  emptyOptionText?: string;
  leftIcon: ReactNode;
  rightIcon: ReactNode;
  footer?: ReactNode;
  options?: ComboboxOption[];
  disabled?: boolean;
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
  groupClassName?: string;
  labelClassName?: string;
  searchValueClassName?: string;
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
}

export interface OptionGroup {
  name?: string;
  options: ComboboxOption[];
}

export function Combobox({
  value,
  emptyOptionText,
  leftIcon,
  rightIcon,
  footer,
  options,
  disabled,
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
  groupClassName,
  labelClassName,
  searchValueClassName,
  descriptionClassName,
  arrowIconClassName,
}: ComboboxProps) {
  const [query, setQuery] = useState("");
  const arrowIconRef = useRef<HTMLButtonElement>(null);

  const optionGroups = groupOptions(options ?? []);

  const visibleOptionGroups = query
    ? optionGroups.filter((group) => optionGroupMatchesQuery(group, query))
    : optionGroups;

  const selectedOption = options?.find((option) => option.value === value);

  return (
    <div className={className}>
      <HeadlessCombobox
        disabled={disabled}
        value={selectedOption ?? null}
        nullable={!selectedOption as true}
        onChange={(option) => onChange?.(option ? option.value : null)}
      >
        {({ open }) => {
          const openMenu = () => {
            arrowIconRef.current?.click();
          };

          return (
            <div className={[inputWrapperClassName, styles.wrapper].join(" ")}>
              <div className={[styles.leftIcon, leftIconClassName].join(" ")}>
                {leftIcon}
              </div>
              <HeadlessCombobox.Input
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
                // Open menu whenever input is focused or clicked
                // (The latter is still needed. When clicking on an input that's already focused, e.g. after selecting an option,
                //  user may want to select another option).
                //
                // P.S. Once `immediate` prop gets released in a stable version
                // ( https://github.com/tailwindlabs/headlessui/discussions/1236 )
                // we may simply switch to that.
                onClick={() => {
                  if (!open) {
                    openMenu();
                  }
                }}
                onFocus={(event) => {
                  if (!open) {
                    openMenu();
                    event.currentTarget.select();
                    event.currentTarget.setSelectionRange(
                      0,
                      event.currentTarget.value.length,
                    );
                  }
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
              <HeadlessCombobox.Button
                ref={arrowIconRef}
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
              </HeadlessCombobox.Button>
              <Transition
                as={Fragment}
                leaveFrom="hide-start"
                leaveTo="hide-end"
                afterLeave={() => setQuery("")}
              >
                <HeadlessCombobox.Options
                  className={[styles.options, optionsClassName].join(" ")}
                >
                  {visibleOptionGroups.length === 0 ? (
                    <p className={emptyOptionClassName}>{emptyOptionText}</p>
                  ) : (
                    visibleOptionGroups.map(({ name, options }) => (
                      <Fragment key={name || "noGroup"}>
                        {name && (
                          <HeadlessCombobox.Label className={groupClassName}>
                            {name}
                          </HeadlessCombobox.Label>
                        )}
                        {options.map((option, optionIndex) => (
                          <HeadlessCombobox.Option
                            key={optionIndex}
                            value={option}
                            data-highlight={
                              option.highlight ? "true" : undefined
                            }
                            className={optionClassName}
                          >
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
                          </HeadlessCombobox.Option>
                        ))}
                      </Fragment>
                    ))
                  )}
                  {footer && <div>{footer}</div>}
                </HeadlessCombobox.Options>
              </Transition>
            </div>
          );
        }}
      </HeadlessCombobox>
    </div>
  );
}
