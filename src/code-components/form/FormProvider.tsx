import { zodResolver } from "@hookform/resolvers/zod";
import { DataProvider } from "@plasmicapp/react-web/lib/host";
import { ReactNode } from "react";
import { UseFormProps, useForm } from "react-hook-form";
import { z } from "zod";

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
}: FormProviderProps) {
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
    <DataProvider name={contextName} data={form}>
      {children}
    </DataProvider>
  );
}
