import { PlasmicComponentLoader } from "@plasmicapp/loader-react";
import { FormControlProvider } from "./FormControlProvider";
import { FormProvider } from "./FormProvider";

export function registerFormProvider(
  plasmic: PlasmicComponentLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
) {
  plasmic.registerComponent(FormProvider, {
    name: "FormProvider",
    importPath: modulePath + "/code-components/form/FormProvider",
    props: {
      contextName: {
        type: "string",
        defaultValue: "form",
        description:
          "Variable name under which the form will be stored in the $ctx object",
      },
      defaultValues: {
        type: "object",
        description:
          "Used only on initial mount. If you want to reset the values after the form is mounted, use `values` prop instead. More details: https://react-hook-form.com/docs/useform#defaultValues .",
      },
      values: {
        type: "object",
        description:
          "Whenever this prop receives a new value (comparison done using deep equality check), form values will be updated. Useful when your form needs to be updated by external state or server data.",
      },
      mode: {
        type: "choice",
        options: ["onBlur", "onChange", "onSubmit", "onTouched", "all"],
        advanced: true,
        description: "Validation strategy **before** submitting behaviour.",
      },
      reValidateMode: {
        type: "choice",
        options: ["onBlur", "onChange", "onSubmit"],
        advanced: true,
        description: "Validation strategy **after** submitting behaviour.",
      },
      resetOptions: {
        type: "object",
        advanced: true,
        description:
          "Specifies the behavior after values or defaultValues are asynchronously updated. See [reset method](https://react-hook-form.com/docs/useform/reset) for the list of available options.",
      },
      shouldUnregister: {
        type: "boolean",
        defaultValueHint: false,
        advanced: true,
        description: "Enable to unregister inputs during unmount.",
      },
      zodValidationSchema: {
        type: "object",
        defaultExprHint: `$$.zod().object({
  name: $$.zod().string(),
  age: $$.zod().number(),
})`,
        description:
          "zod schema against which the form will be validated. If provided, field-level validation rules cannot be applied.",
        advanced: true,
      },
      children: { type: "slot" },
    },
    providesData: true,
    isAttachment: true,
  });

  plasmic.registerComponent(FormControlProvider, {
    name: "FormControlProvider",
    importPath: modulePath + "/code-components/form/FormControlProvider",
    props: {
      contextName: {
        type: "string",
        defaultValue: "control",
        description:
          "Variable name under which the form control will be stored in the $ctx object",
      },
      formControl: {
        type: "object",
        defaultExprHint: "$ctx.form.control",
      },
      fieldName: {
        type: "string",
        required: true,
      },
      defaultValue: {
        type: "string",
        helpText:
          "You can set the default value at control level, but the recommended way is to do it at form level (in FormProvider component).",
        advanced: true,
      },
      disabled: {
        type: "boolean",
        defaultValueHint: false,
        advanced: true,
        description:
          "Controlled input will be disabled and its value will be omitted from the submission data. It will also be returned as control's `field.disabled` prop.",
      },
      shouldUnregister: {
        type: "boolean",
        defaultValueHint: false,
        advanced: true,
        description: "Enable to unregister input during unmount.",
      },
      rules: {
        type: "object",
        defaultValueHint: { required: true },
        description:
          "Validation rules in the same format for [register](https://react-hook-form.com/docs/useform/register), which includes: required, min, max, minLength, maxLength, pattern, validate",
      },
      children: { type: "slot" },
    },
    providesData: true,
    isAttachment: true,
  });
}
