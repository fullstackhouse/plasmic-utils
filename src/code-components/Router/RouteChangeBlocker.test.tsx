import { useSelector } from "@plasmicapp/react-web/lib/host";
import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Router } from "./Router";
import { RouteContext } from "./useRouterContext";
import {
  RouteChangeBlockerContext,
  RouteChangeBlocker,
} from "./RouteChangeBlocker";

afterEach(cleanup);

describe.sequential(Router.name, () => {
  it("blocks route changes", async () => {
    const { result } = renderRouter();

    expect(result.current.blocker).toMatchObject({
      state: "unblocked",
    });

    act(() => {
      result.current.route.setQuery({ a: "b" });
    });

    await waitFor(() => {
      expect(result.current.blocker).toMatchObject({
        state: "blocked",
      });
      expect(result.current.route.query).toEqual({});
    });
  });

  it("block can be reset", async () => {
    const { result } = renderRouter();

    act(() => {
      result.current.route.setQuery({ a: "b" });
    });
    await waitFor(() => {
      expect(result.current.blocker).toMatchObject({
        state: "blocked",
      });
    });

    act(() => {
      result.current.blocker.reset();
    });

    await waitFor(() => {
      expect(result.current.blocker).toMatchObject({
        state: "unblocked",
      });
      expect(result.current.route.query).toEqual({});
    });
  });

  it("block can be cancelled, proceeding the route change", async () => {
    const { result } = renderRouter();

    act(() => {
      result.current.route.setQuery({ a: "b" });
    });

    await waitFor(() => {
      expect(result.current.blocker).toMatchObject({
        state: "blocked",
      });
    });

    act(() => {
      result.current.blocker.proceed();
    });

    await waitFor(() => {
      expect(result.current.blocker).toMatchObject({
        state: "unblocked",
      });
      expect(result.current.route.query).toEqual({ a: "b" });
    });
  });
});

function renderRouter() {
  return renderHook(useContexts, {
    wrapper: ({ children }) => {
      return (
        <Router storage="memory">
          <RouteChangeBlocker>{children}</RouteChangeBlocker>
        </Router>
      );
    },
  });
}

function useContexts() {
  const route = useSelector("route") as RouteContext;
  const blocker = useSelector("blocker") as RouteChangeBlockerContext;
  return { route, blocker };
}
