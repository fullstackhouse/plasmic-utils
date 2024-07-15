import { useDataEnv } from "@plasmicapp/loader-react";
import { useEffect, useRef } from "react";
import { RouterContextValue } from "./Router";

export interface RouteQuerySynchronizerProps {
  queryParamName: string;
  value: string;
  defaultValue?: string | null;
  onChange?(value: string | null): void;
}

export function RouteQuerySynchronizer({
  queryParamName,
  value: propValue,
  defaultValue = null,
  onChange,
}: RouteQuerySynchronizerProps) {
  const $ctx = useDataEnv();
  const route = $ctx!.route as RouterContextValue;

  const prevPropValue = useRef(propValue);

  const queryValue = route.query[queryParamName];
  const prevQueryValue = useRef(queryValue);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Local state -> Router state
  useEffect(() => {
    if (prevPropValue.current !== propValue) {
      prevPropValue.current = propValue;
      prevQueryValue.current = propValue;
      route.setQuery({
        [queryParamName]: propValue == defaultValue ? null : propValue,
      });
    }
  }, [queryParamName, route, propValue, defaultValue]);

  // Router state -> Local state
  useEffect(() => {
    if (prevQueryValue.current !== queryValue) {
      prevQueryValue.current = queryValue;
      onChangeRef.current?.(queryValue ?? defaultValue);
    }
  }, [queryValue, defaultValue]);

  return null;
}
