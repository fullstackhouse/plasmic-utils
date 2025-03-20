import { DataProvider, useSelector } from "@plasmicapp/react-web/lib/host";
import { act, cleanup, render, waitFor } from "@testing-library/react";
import { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Key, SWRConfig } from "swr";
import { afterEach, describe, it, onTestFinished, vitest } from "vitest";
import { ApiErrorBoundary } from "./ApiErrorBoundary";
import { FetchError } from "./FetchError";
import { subscribeToUnauthorizedEvents } from "./UnauthorizedEvent";
import { stubApi } from "./stubApi.test-helper";
import {
  ApiMutationProvider,
  ApiMutationProviderProps,
} from "./ApiMutationProvider";
import { SWRMutationResponse } from "swr/mutation";
import { ApiContextProvider } from "./ApiContext";
import { jsonApiMiddleware } from "./middlewares/json";
import { ApiRequest } from "./middlewares/middleware";

stubApi();
afterEach(cleanup);

function renderApiMutationProvider(props?: Partial<ApiMutationProviderProps>) {
  const toast = {
    show: vitest.fn(),
  };

  let responseRef: SWRMutationResponse<
    any,
    any,
    Key,
    Partial<ApiRequest> | undefined
  >;

  let __renderNumber = 0;
  function TestComponent() {
    const response = useSelector("response") as SWRMutationResponse<
      any,
      any,
      Key,
      Partial<ApiRequest> | undefined
    >;
    responseRef = response;
    return useMemo(() => {
      return JSON.stringify({ ...response, __renderNumber: ++__renderNumber });
    }, [response]);
  }

  function getNode() {
    return (
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
                  <ApiMutationProvider
                    {...{
                      path: "http://localhost/foo",
                      useNodejsApi: false,
                      retryOnError: false,
                      middleware: "json",
                      ...props,
                    }}
                  >
                    <TestComponent />
                  </ApiMutationProvider>
                </Suspense>
              </ApiErrorBoundary>
            </ErrorBoundary>
          </DataProvider>
        </SWRConfig>
      </ApiContextProvider>
    );
  }

  const result = render(getNode());

  return {
    toast,
    result,
    getResponse() {
      return responseRef;
    },
    getOutput() {
      return JSON.parse(result.container.innerHTML);
    },
    rerender() {
      result.rerender(getNode());
    },
  };
}

describe.sequential(ApiMutationProvider.name, () => {
  it("returns isMutating: false on init", async ({ expect }) => {
    const { getOutput } = renderApiMutationProvider();

    expect(getOutput()).toEqual({
      isMutating: false,
      __renderNumber: expect.anything(),
    });
  });

  it("returns isMutating: true when fetch starts", async ({ expect }) => {
    const { getOutput, getResponse } = renderApiMutationProvider();

    act(() => {
      getResponse().trigger();
    });

    expect(getOutput()).toEqual({
      isMutating: true,
      __renderNumber: expect.anything(),
    });
  });

  it("returns data when fetch succeeds", async ({ expect }) => {
    const { getOutput, getResponse } = renderApiMutationProvider();

    act(() => {
      getResponse().trigger();
    });

    await waitFor(() => {
      expect(getOutput()).toEqual({
        data: {
          foo: "bar",
        },
        isMutating: false,
        __renderNumber: expect.anything(),
      });
    });
  });

  it("keeps returning reference to the same object", async ({ expect }) => {
    const { getOutput, rerender } = renderApiMutationProvider();

    let prevOutput = getOutput();
    rerender();
    expect(getOutput().__renderNumber).toEqual(prevOutput.__renderNumber);
  });

  it("calls onLoad when data is loaded", async ({ expect }) => {
    const onLoad = vitest.fn();
    const { getOutput, getResponse } = renderApiMutationProvider({ onLoad });

    act(() => {
      getResponse().trigger();
    });

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
    const { getOutput, getResponse } = renderApiMutationProvider({
      path: "http://localhost/error",
    });

    await act(async () => {
      try {
        await getResponse().trigger();
        throw new Error("unexpected success");
      } catch (error) {
        expect(error).toBeInstanceOf(FetchError);
      }
    });

    await waitFor(() => {
      expect(getOutput()).toMatchObject({
        error: { name: "FetchError" },
        isMutating: false,
      });
    });
  });

  it("calls onError when fetch fails", async ({ expect }) => {
    const onError = vitest.fn();
    const { getOutput, getResponse } = renderApiMutationProvider({
      path: "http://localhost/error",
      onError,
    });

    act(() => {
      getResponse()
        .trigger()
        .catch((e) => null);
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
    const { getOutput, getResponse } = renderApiMutationProvider({
      method: "GET",
      path: "http://localhost/401",
      onError,
    });

    act(() => {
      getResponse()
        .trigger()
        .catch((e) => null);
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
    const { toast, getOutput, getResponse } = renderApiMutationProvider({
      path: "http://localhost/error",
    });

    act(() => {
      getResponse()
        .trigger()
        .catch((e) => null);
    });

    await waitFor(() => {
      expect(getOutput()).toMatchObject({
        error: { name: "FetchError" },
        isMutating: false,
      });

      expect(toast.show).toHaveBeenCalledTimes(1);
    });
  });

  it("if fetch fails because of an application error in transformResponse, an error is thrown during the render, and it is not caught by ApiErrorBoundary", async ({
    expect,
  }) => {
    const { getOutput, getResponse } = renderApiMutationProvider({
      transformResponse() {
        throw new TypeError("test error (ignore-console)");
      },
    });

    act(() => {
      getResponse()
        .trigger()
        .catch((e) => null);
    });

    await waitFor(() => {
      expect(getOutput()).toMatchObject({
        error: "TypeError: test error (ignore-console)",
      });
    });
  });

  it("uses different middleware if specified", async ({ expect }) => {
    const { getOutput, getResponse } = renderApiMutationProvider({
      middleware: "passthrough",
    });

    act(() => {
      getResponse().trigger({ body: { abc: "def" } });
    });

    await waitFor(() => {
      expect(getOutput()).toEqual({
        data: {
          method: "POST",
          path: "http://localhost/foo",
          body: { abc: "def" },
        },
        isMutating: false,
        __renderNumber: expect.anything(),
      });
    });
  });
});
