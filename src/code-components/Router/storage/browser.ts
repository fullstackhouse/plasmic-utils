import { buildSubject } from "../utils/Subject";
import { Route, RouteStorage } from "./base";

export function buildBrowserRouteStorage(): RouteStorage {
  const routeSubject = buildSubject<Route>();

  window.addEventListener("popstate", onWindowPopState);
  function destroy() {
    window.removeEventListener("popstate", onWindowPopState);
  }

  function onWindowPopState(event: PopStateEvent) {
    const route = getCurrentRoute();
    routeSubject.emit(route);
  }

  function getCurrentRoute() {
    return { queryString: getQueryStringFromLocation() };
  }

  return {
    getCurrentRoute,

    pushRoute(route) {
      const url = buildUrlFromRoute(route);
      window.history.pushState({}, "", url);
    },

    replaceRoute(route) {
      const url = buildUrlFromRoute(route);
      window.history.replaceState({}, "", url);
      routeSubject.emit(route);
    },

    onRouteChange(listener) {
      return routeSubject.subscribe(listener);
    },

    destroy,
  };
}

function buildUrlFromRoute(route: Route) {
  const url = new URL(location.href);
  url.search = route.queryString || "";
  return url.toString();
}

function getQueryStringFromLocation(): string | null {
  if (typeof location === "undefined") {
    return null;
  }

  if (location.search && location.search !== "?") {
    return location.search.slice("?".length);
  }

  return null;
}
