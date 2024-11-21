import { useState, useLayoutEffect } from "react";
import { RouteStorage, Route } from "./storage/base";

export function useRoute(storage: RouteStorage): Route {
  const [currentRoute, setCurrentRoute] = useState(storage.getCurrentRoute());

  useLayoutEffect(() => {
    storage.onRouteChange(setCurrentRoute);

    return () => {
      storage.destroy();
    };
  }, [storage]);

  return currentRoute;
}
