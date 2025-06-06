import { DataProvider, useSelector } from "@plasmicapp/react-web/lib/host";
import { cleanup, render, waitFor } from "@testing-library/react";
import { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SWRConfig } from "swr";
import { afterEach, describe, it, onTestFinished, vitest } from "vitest";
import { ApiErrorBoundary } from "./ApiErrorBoundary";
import { ApiProvider, ApiProviderProps } from "./ApiProvider";
import { FetchError } from "./FetchError";
import { subscribeToUnauthorizedEvents } from "./UnauthorizedEvent";
import { stubApi } from "./stubApi.test-helper";
import { ApiContextProvider } from "./ApiContext";
import { jsonApiMiddleware } from "./middlewares/json";

stubApi();
afterEach(cleanup);

let __renderNumber = 0;
function TestComponent() {
  const response = useSelector("response");
  return useMemo(() => {
    return JSON.stringify({ ...response, __renderNumber: ++__renderNumber });
  }, [response]);
}

function renderApiProvider(props?: Partial<ApiProviderProps>) {
  const toast = {
    show: vitest.fn(),
  };

  const getNode = () => (
    <ApiContextProvider
      middlewares={[
        jsonApiMiddleware,
        {
          name: "passthrough",
          fetch(request) {
            return Promise.resolve({
              ...request,
            });
          },
        },
      ]}
    >
      <SWRConfig value={{ provider: () => new Map() }}>
        <DataProvider name="toast" data={toast}>
          <ErrorBoundary
            fallbackRender={({ error }) =>
              JSON.stringify({ error: error.toString() })
            }
          >
            <ApiErrorBoundary
              fallback={JSON.stringify({ suspended: true, error: true })}
            >
              <Suspense
                fallback={JSON.stringify({ suspended: true, loading: true })}
              >
                <ApiProvider
                  {...{
                    path: "http://localhost/foo",
                    useNodejsApi: false,
                    retryOnError: false,
                    middleware: "json",
                    ...props,
                  }}
                >
                  <TestComponent />
                </ApiProvider>
              </Suspense>
            </ApiErrorBoundary>
          </ErrorBoundary>
        </DataProvider>
      </SWRConfig>
    </ApiContextProvider>
  );

  const result = render(getNode());

  return {
    toast,
    result,
    getOutput() {
      return JSON.parse(result.container.innerHTML);
    },
    rerender() {
      result.rerender(getNode());
    },
  };
}

describe.sequential(ApiProvider.name, () => {
  it("returns loading state on init", async ({ expect }) => {
    const { getOutput } = renderApiProvider();

    expect(getOutput()).toMatchObject({
      isLoading: true,
      isValidating: true,
    });
  });

  it("returns data when fetch succeeds", async ({ expect }) => {
    const { getOutput } = renderApiProvider();

    await waitFor(() => {
      expect(getOutput()).toEqual({
        data: {
          foo: "bar",
        },
        isLagging: false,
        isLoading: false,
        isValidating: false,
        __renderNumber: expect.anything(),
      });
    });
  });

  it("keeps returning reference to the same object", async ({ expect }) => {
    const { getOutput, rerender } = renderApiProvider();

    let prevOutput = getOutput();
    rerender();
    expect(getOutput().__renderNumber).toEqual(prevOutput.__renderNumber);
  });

  it("calls onLoad when data is loaded", async ({ expect }) => {
    const onLoad = vitest.fn();
    const { getOutput } = renderApiProvider({ onLoad });

    await waitFor(() => {
      expect(getOutput()).toMatchObject({
        data: {
          foo: "bar",
        },
      });
    });

    expect(onLoad).toHaveBeenCalledTimes(1);
    expect(onLoad).toHaveBeenCalledWith({ foo: "bar" });
  });

  it("returns error when fetch fails", async ({ expect }) => {
    const { getOutput } = renderApiProvider({
      path: "http://localhost/error",
    });

    await waitFor(() => {
      expect(getOutput()).toMatchObject({
        error: { name: "FetchError" },
        isLoading: false,
        isValidating: false,
      });
    });
  });

  it("calls onError when fetch fails", async ({ expect }) => {
    const onError = vitest.fn();
    const { getOutput } = renderApiProvider({
      path: "http://localhost/error",
      onError,
    });

    await waitFor(() => {
      expect(getOutput()).toMatchObject({
        error: { name: "FetchError" },
      });
    });

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(expect.any(FetchError));
  });

  it("dispatches unauthorized window event when server responds with 401", async ({
    expect,
  }) => {
    const onUnauthorized = vitest.fn();
    const unsubscribe = subscribeToUnauthorizedEvents(onUnauthorized);
    onTestFinished(unsubscribe);

    const onError = vitest.fn();
    const { getOutput } = renderApiProvider({
      path: "http://localhost/401",
      onError,
    });

    await waitFor(() => {
      expect(getOutput()).toMatchObject({
        error: { name: "FetchError" },
      });
    });

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(expect.any(FetchError));

    expect(onUnauthorized).toHaveBeenCalledTimes(1);
  });

  it("shows toast when fatch fails", async ({ expect }) => {
    const { toast, getOutput } = renderApiProvider({
      path: "http://localhost/error",
    });

    await waitFor(() => {
      expect(getOutput()).toMatchObject({
        error: { name: "FetchError" },
        isLoading: false,
        isValidating: false,
      });
    });

    expect(toast.show).toHaveBeenCalledTimes(1);
  });

  it("if fetch fails because of an application error in transformResponse, an error is thrown during the render, and it is not caught by ApiErrorBoundary", async ({
    expect,
  }) => {
    const { getOutput } = renderApiProvider({
      transformResponse() {
        throw new TypeError("test error");
      },
    });

    await waitFor(() => {
      expect(getOutput()).toMatchObject({
        error: "TypeError: test error",
      });
    });
  });

  it("if suspense is enabled, suspends rendering until data is fetched", async ({
    expect,
  }) => {
    const { getOutput } = renderApiProvider({ suspense: true });

    expect(getOutput()).toEqual({ suspended: true, loading: true });

    await waitFor(() => {
      expect(getOutput()).toMatchObject({
        data: {
          foo: "bar",
        },
      });
    });
  });

  it("if suspense is enabled, and fetch fails, throws an error that can be later caught by ApiErrorBoundary", async ({
    expect,
  }) => {
    const { toast, getOutput } = renderApiProvider({
      path: "http://localhost/error",
      suspense: true,
    });

    expect(getOutput()).toEqual({ suspended: true, loading: true });

    await waitFor(() => {
      expect(getOutput()).toMatchObject({
        suspended: true,
        error: true,
      });
    });

    expect(toast.show).toHaveBeenCalledTimes(1);
  });

  it("if suspense is enabled, and fetch fails, toast is shown", async ({
    expect,
  }) => {
    const { getOutput } = renderApiProvider({
      path: "http://localhost/error",
      suspense: true,
    });

    expect(getOutput()).toEqual({ suspended: true, loading: true });

    await waitFor(() => {
      expect(getOutput()).toMatchObject({
        suspended: true,
        error: true,
      });
    });
  });

  it("if suspense is enabled, and fetch fails because of an application error in transformResponse, an error is thrown during the render, and it is not caught by ApiErrorBoundary", async ({
    expect,
  }) => {
    const { toast, getOutput } = renderApiProvider({
      suspense: true,
      transformResponse() {
        throw new TypeError("test error");
      },
    });

    await waitFor(() => {
      expect(getOutput()).toMatchObject({
        error: "TypeError: test error",
      });
    });
  });

  it("uses different middleware if specified", async ({ expect }) => {
    const { getOutput } = renderApiProvider({ middleware: "passthrough" });

    await waitFor(() => {
      expect(getOutput()).toEqual({
        data: {
          method: "GET",
          path: "http://localhost/foo",
        },
        isLagging: false,
        isLoading: false,
        isValidating: false,
        __renderNumber: expect.anything(),
      });
    });
  });
});
