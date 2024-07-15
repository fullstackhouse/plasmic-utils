import { PlasmicComponentLoader } from "@plasmicapp/loader-react";
import { RouteQuerySynchronizer } from "./RouteQuerySynchronizer";

export function registerRouteQuerySynchronizer(
  plasmic: PlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils",
) {
  plasmic.registerComponent(RouteQuerySynchronizer, {
    name: "RouteQuerySynchronizer",
    importPath:
      modulePath + "/src/code-components/Router/RouteQuerySynchronizer",
    description: `Utility component to help synchronizing local state with a route query parameter. Set a query param to the \`value\` prop whenever it changes, and calls \`onChange\` prop whenever query param is changed.`,
    props: {
      queryParamName: {
        type: "string",
        defaultValueHint: "user",
      },
      value: {
        type: "string",
        defaultExprHint: "$ctx.auth.userId",
        description: `Whenever \`value\` prop receives a new value, route query param will be set to it.`,
      },
      defaultValue: {
        type: "string",
        description: `If given query param will be set to an empty value whenever the \`value\` equals to \`defaultValue\`. Also influences the \`onChange\` behaviour - whenever query param is set to an empty value, the handler will be called with this \`defaultValue\`.`,
      },
      onChange: {
        type: "eventHandler",
        description: `Whenever the current route query param (named as \`queryParamName\`) receives a new value, \`onChange\` prop will be called with that new value. Not called on initial mount.`,
        argTypes: [
          {
            name: "value",
            type: "string",
          },
        ],
      },
    },
    styleSections: false,
  });
}
