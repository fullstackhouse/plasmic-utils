import { parseDateWithoutTimeZone } from "./parseDateWithoutTimeZone";
import { describe, it, expect } from "vitest";

describe("parseDateWithoutTimeZone", () => {
  it("parses UTC datetimes (with Z suffix)", () => {
    const date = parseDateWithoutTimeZone("2023-06-01T18:01:45.863Z");

    expect(date).toBeInstanceOf(Date);
    expect(date.toString()).toContain("Thu Jun 01 2023 18:01:45");
    expect(date.toLocaleString("en-US").replace(" ", " ")).toEqual(
      "6/1/2023, 6:01:45 PM",
    );

    const dateWithoutMilliseconds = parseDateWithoutTimeZone(
      "2023-06-01T18:01:45Z",
    );
    expect(dateWithoutMilliseconds).toBeInstanceOf(Date);
    expect(dateWithoutMilliseconds.toString()).toEqual(date.toString());
    expect(dateWithoutMilliseconds.toLocaleString("en-US")).toEqual(
      date.toLocaleString("en-US"),
    );
  });

  it("parses datetimes with no UTC offset", () => {
    const date = parseDateWithoutTimeZone("2023-06-01T18:01:45.863");

    expect(date).toBeInstanceOf(Date);
    expect(date.toString()).toContain("Thu Jun 01 2023 18:01:45");
    expect(date.toLocaleString("en-US").replace(" ", " ")).toEqual(
      "6/1/2023, 6:01:45 PM",
    );

    const dateWithoutMilliseconds = parseDateWithoutTimeZone(
      "2023-06-01T18:01:45",
    );
    expect(dateWithoutMilliseconds).toBeInstanceOf(Date);
    expect(dateWithoutMilliseconds.toString()).toEqual(date.toString());
    expect(dateWithoutMilliseconds.toLocaleString("en-US")).toEqual(
      date.toLocaleString("en-US"),
    );
  });

  it("parses datetimes with positive UTC offset", () => {
    const date = parseDateWithoutTimeZone("2023-06-01T18:01:45.863+05:00");

    expect(date).toBeInstanceOf(Date);
    expect(date.toString()).toContain("Thu Jun 01 2023 18:01:45");
    expect(date.toLocaleString("en-US").replace(" ", " ")).toEqual(
      "6/1/2023, 6:01:45 PM",
    );

    const dateWithoutMilliseconds = parseDateWithoutTimeZone(
      "2023-06-01T18:01:45+05:00",
    );
    expect(dateWithoutMilliseconds).toBeInstanceOf(Date);
    expect(dateWithoutMilliseconds.toString()).toEqual(date.toString());
    expect(dateWithoutMilliseconds.toLocaleString("en-US")).toEqual(
      date.toLocaleString("en-US"),
    );
  });

  it("parses datetimes with negative UTC offset", () => {
    const date = parseDateWithoutTimeZone("2023-06-01T18:01:45.863-05:00");

    expect(date).toBeInstanceOf(Date);
    expect(date.toString()).toContain("Thu Jun 01 2023 18:01:45");
    expect(date.toLocaleString("en-US").replace(" ", " ")).toEqual(
      "6/1/2023, 6:01:45 PM",
    );

    const dateWithoutMilliseconds = parseDateWithoutTimeZone(
      "2023-06-01T18:01:45+05:00",
    );
    expect(dateWithoutMilliseconds).toBeInstanceOf(Date);
    expect(dateWithoutMilliseconds.toString()).toEqual(date.toString());
    expect(dateWithoutMilliseconds.toLocaleString("en-US")).toEqual(
      date.toLocaleString("en-US"),
    );
  });

  it("parses dates", () => {
    const date = parseDateWithoutTimeZone("2023-06-01");

    expect(date).toBeInstanceOf(Date);
    expect(date.toString()).toContain("Thu Jun 01 2023 00:00:00");
    expect(date.toLocaleString("en-US").replace(" ", " ")).toEqual(
      "6/1/2023, 12:00:00 AM",
    );
  });
});
