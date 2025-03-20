import type { PlasmicLoader } from "../../plasmic";
import { ApiMutationProvider } from "./ApiMutationProvider";
import { RegisterApiProviderOptions } from "./ApiProvider.register";

export function registerApiMutationProvider(
  plasmic: PlasmicLoader,
  modulePath = "@fullstackhouse/plasmic-utils/dist",
  options: RegisterApiProviderOptions = {},
) {
  plasmic.registerComponent(ApiMutationProvider, {
    name: "ApiMutationProvider",
    importPath: modulePath + "/code-components/ApiProvider/ApiMutationProvider",
    props: {
      method: {
        type: "choice",
        options: ["POST", "PUT", "PATCH", "DELETE"],
        defaultValue: "POST",
        advanced: true,
      },
      path: { type: "string", defaultValue: "/caw/worksheet" },
      query: { type: "object" },
      useNodejsApi: {
        type: "boolean",
        advanced: true,
        hidden: (props: { useNodejsApi?: boolean }) => !props.useNodejsApi,
        description:
          "If enabled, request will be sent to the myevals-nodejs-backend API. DEPRECATED: Use middleware prop instead.",
      },
      ...(options.middlewares
        ? {
            middleware: {
              type: "choice",
              options: options.middlewares.options,
              defaultValue: options.middlewares.defaultValue,
              advanced: true,
            },
          }
        : {}),
      cacheKey: {
        type: "string",
        displayName: "Cache Key",
        defaultValueHint: "Defaults to `[path, query]`",
        description: "A globally unique ID for this query.",
        exprHint: "May be an object or an array.",
        advanced: true,
      },
      name: {
        type: "string",
        defaultValue: "response",
        description: "Variable name to store the fetched response in",
      },
      children: { type: "slot" },
      alertOnError: {
        type: "boolean",
        defaultValue: true,
        advanced: true,
        description: "Show an alert to the user once an error happens.",
      },
      throwOnError: {
        type: "boolean",
        defaultValue: true,
        advanced: true,
        description:
          "If true, `response.trigger()` will throw an error whenever it fails. Otherwise, it will always resolve, but with an undefined (instead of the response object) if an error occurs.",
      },
      transformResponse: {
        type: "object",
        description:
          "Optionally provide a function that will transform the response before returning it further.",
        advanced: true,
        defaultExprHint: "data => data[0]",
      },
      onLoad: {
        type: "eventHandler",
        argTypes: [{ name: "data", type: "object" }],
      },
      onError: {
        type: "eventHandler",
        argTypes: [{ name: "error", type: "object" }],
      },
    },
    providesData: true,
    isAttachment: true,
  });
}
