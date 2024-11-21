import { useSelector } from "@plasmicapp/react-web/lib/host";
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { RouteContext, Router } from "./Router";

afterEach(cleanup);

describe.sequential(Router.name, () => {
  it("provides route context", async () => {
    const { result } = renderRouter();

    expect(result.current.query).toEqual({ a: "b" });
    act(() => result.current.setQuery({ c: "d" }, { merge: false }));
    expect(result.current.query).toEqual({ c: "d" });
    act(() => result.current.setQuery({ a: "b" }, { merge: true }));
    expect(result.current.query).toEqual({ a: "b", c: "d" });
  });
});

function renderRouter() {
  return renderHook(useRoute, {
    wrapper: ({ children }) => {
      return (
        <Router initialQueryString="a=b" storage="memory">
          {children}
        </Router>
      );
    },
  });
}

function useRoute() {
  return useSelector("route") as RouteContext;
}
