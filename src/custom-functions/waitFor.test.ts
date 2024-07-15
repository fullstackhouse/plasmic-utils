import { TimeoutError, waitFor } from "./waitFor";

describe("waitFor", () => {
  it("eventually resolves", async () => {
    let value = false;

    setTimeout(() => {
      value = true;
    }, 50);
    await waitFor(() => value, { timeout: 100, pollInterval: 5 });

    expect(value).toEqual(true);
  });

  it("if callback throws an error, it is passed through", async () => {
    let value = false;

    setTimeout(() => {
      value = true;
    }, 50);
    expect(
      waitFor(
        () => {
          if (value) {
            throw new TypeError("test error");
          }
          return value;
        },
        { timeout: 100, pollInterval: 5 },
      ),
    ).rejects.toThrow(new TypeError("test error"));
  });

  it("if always evaluates to false, eventually throws an error", () => {
    let value = false;

    expect(
      waitFor(() => value, { timeout: 30, pollInterval: 1 }),
    ).rejects.toThrow(new TimeoutError("waitFor timed out"));

    expect(new TimeoutError().name).toEqual("TimeoutError");
  });
});
