import { describe, expect, it } from "vitest";
import { reorderItems } from "./reorderItems";

describe(reorderItems.name, () => {
  const items = ["a", "b", "c", "d"];

  it("moves an item down to the dropped position", () => {
    expect(reorderItems(items, "a", "c")).toEqual({
      orderedItems: ["b", "c", "a", "d"],
      fromIndex: 0,
      toIndex: 2,
    });
  });

  it("moves an item up to the dropped position", () => {
    expect(reorderItems(items, "d", "b")).toEqual({
      orderedItems: ["a", "d", "b", "c"],
      fromIndex: 3,
      toIndex: 1,
    });
  });

  it("returns null when dropped on itself", () => {
    expect(reorderItems(items, "b", "b")).toBeNull();
  });

  it("returns null for an id that is not in the list", () => {
    expect(reorderItems(items, "a", "zzz")).toBeNull();
    expect(reorderItems(items, "zzz", "a")).toBeNull();
  });

  it("does not mutate the input", () => {
    reorderItems(items, "a", "d");
    expect(items).toEqual(["a", "b", "c", "d"]);
  });
});
