import { buildSubject } from "../utils/Subject";
import { Route, RouterAdapter } from "./base";

export interface MemoryRouterAdapterProps {
  initialQueryString?: string;
}

export function buildMemoryRouterAdapter(
  props: MemoryRouterAdapterProps,
): RouterAdapter {
  const routeSubject = buildSubject<Route>();
  const initialRoute: Route = { queryString: props.initialQueryString ?? null };
  const memory: Route[] = [initialRoute];

  function getCurrentRoute() {
    return memory[memory.length - 1];
  }

  return {
    getCurrentRoute,

    pushRoute(route) {
      memory.push(route);
      routeSubject.emit(route);
      console.info("MemoryRouter.pushRoute", route);
    },

    replaceRoute(route) {
      memory[memory.length - 1] = route;
      routeSubject.emit(route);
      console.info("MemoryRouter.replaceRoute", route);
    },

    onRouteChange(listener) {
      return routeSubject.subscribe(listener);
    },

    destroy() {},
  };
}
