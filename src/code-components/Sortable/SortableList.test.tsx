import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SortableDragHandle } from "./SortableDragHandle";
import { SortableItem } from "./SortableItem";
import { SortableList } from "./SortableList";

const ROW_HEIGHT = 40;

// jsdom has no layout; dnd-kit's keyboard coordinates pick the neighbour by
// comparing rects, so give every node the rect of its row (`data-row` sits
// inside the SortableItem node and around the handle).
const originalGetBoundingClientRect =
  HTMLElement.prototype.getBoundingClientRect;

function rowRect(this: HTMLElement): DOMRect {
  const row =
    this.querySelector<HTMLElement>("[data-row]") ??
    this.closest<HTMLElement>("[data-row]");
  const index = row == null ? 0 : Number(row.dataset.row);
  const top = index * ROW_HEIGHT;
  return {
    top,
    bottom: top + ROW_HEIGHT,
    left: 0,
    right: 200,
    width: 200,
    height: ROW_HEIGHT,
    x: 0,
    y: top,
    toJSON: () => ({}),
  };
}

beforeEach(() => {
  HTMLElement.prototype.getBoundingClientRect = rowRect;
});

afterEach(() => {
  cleanup();
  HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect;
});

function renderList(onReorder: (orderedItems: string[]) => void) {
  const items = ["a", "b", "c"];
  return render(
    <SortableList items={items} onReorder={onReorder}>
      {items.map((id, index) => (
        <SortableItem key={id} id={id}>
          <div data-row={index}>
            <SortableDragHandle aria-label={`Drag ${id}`}>⠿</SortableDragHandle>
            <span>Row {id}</span>
          </div>
        </SortableItem>
      ))}
    </SortableList>,
  );
}

describe(SortableList.name, () => {
  it("exposes each handle as a keyboard-reachable sortable button", () => {
    renderList(() => {});

    const handle = screen.getByRole("button", { name: "Drag a" });
    expect(handle.getAttribute("tabindex")).toBe("0");
    expect(handle.getAttribute("aria-roledescription")).toBe("sortable");
  });

  it("reports the full new order after a keyboard move down", async () => {
    const user = userEvent.setup();
    const onReorder = vi.fn();
    renderList(onReorder);

    const handle = screen.getByRole("button", { name: "Drag a" });
    handle.focus();
    await user.keyboard("[Space]");
    await user.keyboard("[ArrowDown]");
    await user.keyboard("[Space]");

    expect(onReorder).toHaveBeenCalledTimes(1);
    expect(onReorder).toHaveBeenCalledWith(["b", "a", "c"], {
      activeId: "a",
      fromIndex: 0,
      toIndex: 1,
      orderedItems: ["b", "a", "c"],
    });
  });

  it("reports nothing when the drag is cancelled", async () => {
    const user = userEvent.setup();
    const onReorder = vi.fn();
    renderList(onReorder);

    screen.getByRole("button", { name: "Drag b" }).focus();
    await user.keyboard("[Space]");
    await user.keyboard("[ArrowDown]");
    await user.keyboard("[Escape]");

    expect(onReorder).not.toHaveBeenCalled();
  });
});
