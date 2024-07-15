import { useEffect, useRef } from "react";
import isEqual from "lodash.isequal";

interface StateProviderProps<T = unknown> {
  value?: T;
  defaultValue?: T;
  forceValue?: T;
  allowedValues?: T[];
  onChange?(value: T | undefined): void;
}

export function StateProvider<T>({
  value,
  defaultValue,
  forceValue,
  allowedValues,
  onChange,
}: StateProviderProps<T>) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  function isValueDisallowed(v: T): boolean {
    return allowedValues != null && !allowedValues.includes(v);
  }

  let nextValue: T | undefined,
    triggerOnChange = false;
  function setValue(suggestedNextValue: T | undefined) {
    if (!isEqual(value, suggestedNextValue)) {
      triggerOnChange = true;
      nextValue = suggestedNextValue;
    }
  }

  if (forceValue !== undefined) {
    setValue(forceValue);
  } else if (value === undefined || isValueDisallowed(value)) {
    if (defaultValue !== undefined && !isValueDisallowed(defaultValue)) {
      setValue(defaultValue);
    } else {
      setValue(undefined);
    }
  }

  useEffect(() => {
    if (triggerOnChange) {
      onChangeRef.current?.(nextValue);
    }
  }, [triggerOnChange, nextValue]);

  return null;
}
