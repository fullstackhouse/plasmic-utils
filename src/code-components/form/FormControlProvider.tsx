import { ReactNode } from "react";
import {
  Control,
  UseControllerProps,
  useController,
  useForm,
} from "react-hook-form";
import { MemoDataProvider } from "../MemoDataProvider/MemoDataProvider";

export interface FormControlProviderProps {
  contextName: string;
  fieldName: string;
  formControl?: Control;
  defaultValue?: unknown;
  disabled?: boolean;
  shouldUnregister?: boolean;
  rules: UseControllerProps["rules"];
  children: ReactNode;
}

export function FormControlProvider({
  contextName,
  fieldName,
  formControl,
  defaultValue,
  disabled,
  shouldUnregister,
  rules,
  children,
}: FormControlProviderProps) {
  if (!formControl) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const form = useForm();
    formControl = form.control;
  }

  const controller = useController({
    name: fieldName,
    control: formControl,
    defaultValue,
    disabled,
    shouldUnregister,
    rules,
  });

  return (
    <MemoDataProvider name={contextName} data={controller} deps={[controller]}>
      {children}
    </MemoDataProvider>
  );
}
