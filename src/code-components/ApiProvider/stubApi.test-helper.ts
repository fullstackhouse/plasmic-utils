import { delay, http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll } from "vitest";

export function stubApi() {
  const server = setupServer(
    http.get("http://localhost/foo", async () => {
      await delay();
      return HttpResponse.json({ foo: "bar" });
    }),
    http.post("http://localhost/foo", async () => {
      await delay();
      return HttpResponse.json({ foo: "bar" });
    }),
    http.get("http://localhost/error", () => HttpResponse.error()),
    http.post("http://localhost/error", () => HttpResponse.error()),
    http.get("http://localhost/401", () =>
      HttpResponse.json({ error: "Not Authorized" }, { status: 401 }),
    ),
  );
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
}
