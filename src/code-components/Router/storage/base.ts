export interface RouteStorage {
  getRoute(): Route;
  pushRoute(route: Route): void;
  replaceRoute(route: Route): void;
  onRouteChange(listener: OnRouteChangeListener): { unsubscribe(): void };
  destroy(): void;
}

export interface Route {
  queryString: string | null;
}

export type OnRouteChangeListener = (route: Route) => void;
