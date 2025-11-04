import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { UseFormProps, useForm } from "react-hook-form";
import { z } from "zod";
import { MemoDataProvider } from "../MemoDataProvider/MemoDataProvider";

export interface FormProviderProps {
  contextName: string;
  defaultValues?: Record<string, any>;
  values?: Record<string, any>;
  mode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all";
  reValidateMode?: "onBlur" | "onChange" | "onSubmit";
  resetOptions?: UseFormProps["resetOptions"];
  shouldUnregister?: boolean;
  zodValidationSchema?: z.Schema;
  children: ReactNode;
  formKey?: string;
}

interface FormWrapperProps extends Omit<FormProviderProps, "formKey"> {}

function FormWrapper({
  contextName,
  defaultValues,
  values,
  mode,
  reValidateMode,
  resetOptions,
  shouldUnregister,
  zodValidationSchema,
  children,
}: FormWrapperProps) {
  const form = useForm({
    defaultValues,
    values,
    mode,
    reValidateMode,
    resetOptions,
    shouldUnregister,
    resolver: zodValidationSchema
      ? zodResolver(zodValidationSchema)
      : undefined,
  });

  return (
    <MemoDataProvider name={contextName} data={form} deps={[form]}>
      {children}
    </MemoDataProvider>
  );
}

export function FormProvider({
  contextName,
  defaultValues,
  values,
  mode,
  reValidateMode,
  resetOptions,
  shouldUnregister,
  zodValidationSchema,
  children,
  formKey,
}: FormProviderProps) {
  return (
    <FormWrapper
      key={formKey}
      contextName={contextName}
      defaultValues={defaultValues}
      values={values}
      mode={mode}
      reValidateMode={reValidateMode}
      resetOptions={resetOptions}
      shouldUnregister={shouldUnregister}
      zodValidationSchema={zodValidationSchema}
    >
      {children}
    </FormWrapper>
  );
}
