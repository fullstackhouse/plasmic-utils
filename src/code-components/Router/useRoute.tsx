import { useState } from "react";
import { useIsomorphicLayoutEffect } from "../../common/useIsomorphicLayoutEffect";
import { Route, RouteStorage } from "./storage/base";

export function useRoute(storage: RouteStorage): Route {
  const [route, setRoute] = useState(storage.getRoute());

  useIsomorphicLayoutEffect(() => {
    storage.onRouteChange(setRoute);

    return () => {
      storage.destroy();
    };
  }, [storage]);

  return route;
}
