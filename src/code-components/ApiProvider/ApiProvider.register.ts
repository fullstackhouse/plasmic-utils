import type { PlasmicLoader } from "../../plasmic";
import { ApiErrorBoundary } from "./ApiErrorBoundary";
import { ApiProvider } from "./ApiProvider";

export interface RegisterApiProviderOptions {
  middlewares?: {
    options: string[];
    defaultValue?: string;
  };
}

export function registerApiProvider(
  plasmic: PlasmicLoader,
  modulePath = "@fullstackhouse/plasmic-utils/dist",
  options: RegisterApiProviderOptions = {},
) {
  const containsMyevalsNodejsBackendMiddleware = (
    options.middlewares?.options ?? []
  ).includes("myevals-nodejs-backend");

  plasmic.registerComponent(ApiProvider, {
    name: "ApiProvider",
    importPath: modulePath + "/code-components/ApiProvider/ApiProvider",
    props: {
      method: {
        type: "choice",
        options: ["GET"],
        defaultValue: "GET",
        advanced: true,
      },
      path: { type: "string", defaultValue: "/caw/departments" },
      query: { type: "object" },
      ...(containsMyevalsNodejsBackendMiddleware
        ? {
            useNodejsApi: {
              type: "boolean",
              defaultValue: true,
              advanced: true,
              description:
                "If enabled, request will be sent to the myevals-nodejs-backend API. DEPRECATED: use middleware prop instead.",
            },
          }
        : {}),
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
      enabled: {
        type: "boolean",
        defaultValue: true,
        advanced: true,
        description:
          "Toggle off to temporarily disable sending fetches to the network. Useful if you want to delay the fetch until some condition happens.",
      },
      name: {
        type: "string",
        defaultValue: "response",
        description: "Variable name to store the fetched response in",
      },
      editorMode: {
        type: "choice",
        defaultValue: "interactive",
        options: [
          { label: "Interactive", value: "interactive" },
          { label: "Loading State", value: "loading" },
          { label: "Error State", value: "error" },
          { label: "Success State (with Preview Data)", value: "success" },
        ],
        description:
          "Alter what should be done instead of fetching the api when in editor mode.",
      },
      previewData: {
        type: "object",
        defaultValue: {},
        description: "Used when Editor Mode is set to Success State.",
      },
      children: { type: "slot" },
      refetchIfStale: {
        type: "boolean",
        defaultValue: true,
        advanced: true,
        description: "Refetch even if cached data exists.",
      },
      refetchOnWindowFocus: {
        type: "boolean",
        defaultValue: false,
        advanced: true,
        description:
          "Refetch once user navigates back to the browser tab or window.",
      },
      refetchOnReconnect: {
        type: "boolean",
        defaultValue: false,
        advanced: true,
        description:
          "Refetch once network connection is recovered after being offline.",
      },
      retryOnError: {
        type: "boolean",
        defaultValue: true,
        advanced: true,
        description: "Retry the request over time if it meets an error.",
      },
      alertOnError: {
        type: "boolean",
        defaultValue: true,
        advanced: true,
        description: "Show an alert to the user once an error happens.",
      },
      transformResponse: {
        type: "object",
        description:
          "Optionally provide a function that will transform the response before returning it further.",
        advanced: true,
        defaultExprHint: "data => data[0]",
      },
      suspense: {
        type: "boolean",
        description:
          "Suspend rendering (and trigger the closest Loading Boundary) until data is fetched. **Note: Don't change this after the component is mounted.**",
        advanced: true,
        defaultValue: false,
      },
      refreshInterval: {
        type: "number",
        description:
          "Optionally specify the interval (in milliseconds), at which data should be automatically refetched.",
        advanced: true,
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

  plasmic.registerComponent(ApiErrorBoundary, {
    name: "ApiErrorBoundary",
    importPath: modulePath + "/code-components/ApiProvider/ApiErrorBoundary",
    isAttachment: true,
    props: {
      previewFallback: {
        type: "boolean",
        defaultValue: false,
      },
      fallback: { type: "slot" },
      children: { type: "slot" },
    },
  });
}
