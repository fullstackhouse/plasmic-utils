import { useState, useLayoutEffect } from "react";
import { RouteStorage, Route } from "./storage/base";

export function useRoute(storage: RouteStorage): Route {
  const [route, setRoute] = useState(storage.getRoute());

  useLayoutEffect(() => {
    storage.onRouteChange(setRoute);

    return () => {
      storage.destroy();
    };
  }, [storage]);

  return route;
}
