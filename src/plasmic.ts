import type {
  registerComponent,
  registerFunction,
  registerGlobalContext,
} from "@plasmicapp/react-web/lib/host";

export interface PlasmicLoader {
  registerComponent: typeof registerComponent;
  registerFunction: typeof registerFunction;
  registerGlobalContext: typeof registerGlobalContext;
}
