import { buildSubject } from "../utils/Subject";
import { Route, RouteStorage } from "./base";

export interface MemoryRouteStorageInput {
  initialQueryString?: string;
}

export function buildMemoryRouteStorage(
  input: MemoryRouteStorageInput,
): RouteStorage {
  const routeSubject = buildSubject<Route>();
  const initialRoute: Route = { queryString: input.initialQueryString ?? null };
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
