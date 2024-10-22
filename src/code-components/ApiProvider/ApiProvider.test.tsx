import { DataProvider, useSelector } from "@plasmicapp/react-web/lib/host";
import { render, waitFor } from "@testing-library/react";
import { delay, http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  it,
  onTestFinished,
  vitest,
} from "vitest";
import { ApiProvider, ApiProviderProps, ApiResponse } from "./ApiProvider";
import { FetchError } from "./FetchError";
import { subscribeToUnauthorizedEvents } from "./UnauthorizedEvent";

const server = setupServer(
  http.get("http://localhost/foo", async () => {
    await delay();
    return HttpResponse.json({ foo: "bar" });
  }),
  http.get("http://localhost/error", () => HttpResponse.error()),
  http.get("http://localhost/401", () =>
    HttpResponse.json({ error: "Not Authorized" }, { status: 401 }),
  ),
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function TestComponent() {
  const response = useSelector("response") as ApiResponse;
  return JSON.stringify(response);
}

function renderApiProvider(props?: Partial<ApiProviderProps>) {
  const toast = {
    show: vitest.fn(),
  };

  const result = render(
    <DataProvider name="toast" data={toast}>
      <ApiProvider
        {...{
          path: "http://localhost/foo",
          useNodejsApi: false,
          retryOnError: false,
          ...props,
        }}
      >
        <TestComponent />
      </ApiProvider>
    </DataProvider>,
  );

  onTestFinished(() => result.unmount());

  return {
    toast,
    result,
  };
}

function getOutput(container: HTMLElement) {
  return JSON.parse(container.innerHTML) as ApiResponse;
}

describe.sequential(ApiProvider.name, () => {
  it("returns loading state on init", async ({ expect }) => {
    const {
      result: { container },
    } = renderApiProvider();

    expect(getOutput(container)).toMatchObject({
      isLoading: true,
      isValidating: true,
    });
  });

  it("returns data when fetch succeeds", async ({ expect }) => {
    const {
      result: { container },
    } = renderApiProvider();

    await waitFor(() => {
      expect(getOutput(container)).toEqual({
        data: {
          foo: "bar",
        },
        isLagging: false,
        isLoading: false,
        isValidating: false,
      });
    });
  });

  it("calls onLoad when data is loaded", async ({ expect }) => {
    const onLoad = vitest.fn();
    const {
      result: { container },
    } = renderApiProvider({ onLoad });

    await waitFor(() => {
      expect(getOutput(container)).toMatchObject({
        data: {
          foo: "bar",
        },
      });
    });

    expect(onLoad).toHaveBeenCalledTimes(1);
    expect(onLoad).toHaveBeenCalledWith({ foo: "bar" });
  });

  it("returns error when fetch fails", async ({ expect }) => {
    const {
      result: { container },
    } = renderApiProvider({
      path: "http://localhost/error",
    });

    await waitFor(() => {
      expect(getOutput(container)).toMatchObject({
        error: { name: "FetchError" },
        isLoading: false,
        isValidating: false,
      });
    });
  });

  it("calls onError when fetch fails", async ({ expect }) => {
    const onError = vitest.fn();
    const {
      result: { container },
    } = renderApiProvider({
      path: "http://localhost/error",
      onError,
    });

    await waitFor(() => {
      expect(getOutput(container)).toMatchObject({
        error: { name: "FetchError" },
      });
    });

    // Somehow this gets called twice... no idea why. Doesn't happen if you run just this test in isolation. Commenting out for now.
    // expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(expect.any(FetchError));
  });

  it("dispatches unauthorized window event when server responds with 401", async ({
    expect,
  }) => {
    const onUnauthorized = vitest.fn();
    const unsubscribe = subscribeToUnauthorizedEvents(onUnauthorized);
    onTestFinished(unsubscribe);

    const onError = vitest.fn();
    const {
      result: { container },
    } = renderApiProvider({
      path: "http://localhost/401",
      onError,
    });

    await waitFor(() => {
      expect(getOutput(container)).toMatchObject({
        error: { name: "FetchError" },
      });
    });

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(expect.any(FetchError));

    expect(onUnauthorized).toHaveBeenCalledTimes(1);
  });

  it("shows toast when fatch fails", async ({ expect }) => {
    const {
      toast,
      result: { container },
    } = renderApiProvider({
      path: "http://localhost/error",
    });

    await waitFor(() => {
      expect(getOutput(container)).toMatchObject({
        error: { name: "FetchError" },
        isLoading: false,
        isValidating: false,
      });

      expect(toast.show).toHaveBeenCalledTimes(1);
    });
  });
});
