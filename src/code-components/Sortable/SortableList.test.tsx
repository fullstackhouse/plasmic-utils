import { useDataEnv } from "@plasmicapp/react-web/lib/host";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
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

function DropPosition() {
  const dropPosition = useDataEnv()?.sortableItem?.dropPosition;
  return dropPosition == null ? null : <i>{dropPosition}</i>;
}

/** The node `SortableItem` registers with dnd-kit. */
function itemNode(id: string): HTMLElement {
  const row = screen.getByText(`Row ${id}`).closest("[data-row]");
  // With `showDropIndicator` the row is wrapped once more inside the item.
  const node = row?.closest<HTMLElement>(".sortable-item");
  if (node == null) {
    throw new Error(`No item around row ${id}`);
  }
  return node;
}

/** The node that follows the pointer or the arrow keys. */
function contentNode(id: string): HTMLElement {
  const content = itemNode(id).lastElementChild;
  if (!(content instanceof HTMLElement)) {
    throw new Error(`Item ${id} has no content`);
  }
  return content;
}

/** Markup of an item, without the id `useId` numbers per test order. */
function itemMarkup(id: string): string {
  return itemNode(id).outerHTML.replace(/:r\w+:/g, "<id>");
}

async function dragWithKeyboard(id: string, ...keys: string[]) {
  const user = userEvent.setup();
  screen.getByRole("button", { name: `Drag ${id}` }).focus();
  await user.keyboard("[Space]");
  for (const key of keys) {
    await user.keyboard(`[${key}]`);
  }
}

function renderList(
  onReorder: (orderedItems: string[]) => void,
  {
    disabled = false,
    showDropIndicator,
  }: { disabled?: boolean; showDropIndicator?: boolean } = {},
) {
  const items = ["a", "b", "c"];
  return render(
    <SortableList
      items={items}
      onReorder={onReorder}
      disabled={disabled}
      showDropIndicator={showDropIndicator}
    >
      {items.map((id, index) => (
        <SortableItem
          key={id}
          id={id}
          className="sortable-item"
          placeholder={<span>Place of {id}</span>}
        >
          <div data-row={index}>
            <SortableDragHandle aria-label={`Drag ${id}`}>⠿</SortableDragHandle>
            <span>Row {id}</span>
            <DropPosition />
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

  it("disables every row when the list is disabled", async () => {
    const user = userEvent.setup();
    const onReorder = vi.fn();
    renderList(onReorder, { disabled: true });

    const handle = screen.getByRole("button", { name: "Drag a" });
    expect(handle.getAttribute("aria-disabled")).toBe("true");

    handle.focus();
    await user.keyboard("[Space]");
    await user.keyboard("[ArrowDown]");
    await user.keyboard("[Space]");

    expect(onReorder).not.toHaveBeenCalled();
  });

  it("renders without items while the data source is still loading", () => {
    render(
      <SortableList>
        <span>empty</span>
      </SortableList>,
    );
    expect(screen.getByText("empty")).toBeTruthy();
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

  describe("without showDropIndicator", () => {
    it("renders the row as the only child of the item, at rest and during a drag", async () => {
      renderList(() => {});
      expect(itemMarkup("a")).toMatchInlineSnapshot(
        `"<div class="sortable-item" style="position: relative;"><div data-row="0"><div style="cursor: grab;" aria-label="Drag a" role="button" tabindex="0" aria-disabled="false" aria-roledescription="sortable" aria-describedby="<id>">⠿</div><span>Row a</span></div></div>"`,
      );

      await dragWithKeyboard("a", "ArrowDown");

      await waitFor(() =>
        expect(itemNode("a").style.transform).toBe("translate3d(0px, 40px, 0)"),
      );
      expect(itemMarkup("a")).toMatchInlineSnapshot(
        `"<div class="sortable-item" style="position: relative; transition: transform 200ms ease; z-index: 1; transform: translate3d(0px, 40px, 0);" data-sortable-dragging="true"><div data-row="0"><div style="cursor: grabbing;" aria-label="Drag a" role="button" tabindex="0" aria-disabled="false" aria-roledescription="sortable" aria-describedby="<id>" aria-pressed="true">⠿</div><span>Row a</span></div></div>"`,
      );
    });

    it("moves the other items out of the way", async () => {
      renderList(() => {});

      await dragWithKeyboard("a", "ArrowDown");

      await waitFor(() =>
        expect(itemNode("b").style.transform).toBe(
          "translate3d(0px, -40px, 0)",
        ),
      );
    });
  });

  describe("with showDropIndicator", () => {
    it("moves only the content of the dragged item, every item stays in place", async () => {
      renderList(() => {}, { showDropIndicator: true });

      await dragWithKeyboard("a", "ArrowDown");

      await waitFor(() =>
        expect(contentNode("a").style.transform).toBe(
          "translate3d(0px, 40px, 0)",
        ),
      );
      expect(["a", "b", "c"].map((id) => itemNode(id).style.transform)).toEqual(
        ["", "", ""],
      );
      expect(["b", "c"].map((id) => contentNode(id).style.transform)).toEqual([
        "",
        "",
      ]);
    });

    it("shows the placeholder only in the dragged item and only during the drag", async () => {
      renderList(() => {}, { showDropIndicator: true });
      expect(screen.queryByText(/^Place of/)).toBeNull();

      await dragWithKeyboard("b", "ArrowDown");

      expect(
        screen.getAllByText(/^Place of/).map((node) => node.textContent),
      ).toEqual(["Place of b"]);
      expect(itemNode("b").contains(screen.getByText("Place of b"))).toBe(true);

      await userEvent.keyboard("[Escape]");

      await waitFor(() => expect(screen.queryByText(/^Place of/)).toBeNull());
    });

    it("provides dropPosition `after` on the item below the dragged one", async () => {
      renderList(() => {}, { showDropIndicator: true });

      await dragWithKeyboard("a", "ArrowDown");

      await waitFor(() => expect(screen.getByText("after")).toBeTruthy());
      expect(itemNode("b").contains(screen.getByText("after"))).toBe(true);
      expect(screen.queryByText("before")).toBeNull();
    });

    it("provides dropPosition `before` on the item above the dragged one", async () => {
      renderList(() => {}, { showDropIndicator: true });

      await dragWithKeyboard("c", "ArrowUp");

      await waitFor(() => expect(screen.getByText("before")).toBeTruthy());
      expect(itemNode("b").contains(screen.getByText("before"))).toBe(true);
      expect(screen.queryByText("after")).toBeNull();
    });

    it("provides no dropPosition over the place the item came from", async () => {
      renderList(() => {}, { showDropIndicator: true });

      await dragWithKeyboard("a", "ArrowDown");
      await waitFor(() => expect(screen.getByText("after")).toBeTruthy());
      await userEvent.keyboard("[ArrowUp]");

      await waitFor(() => expect(screen.queryByText("after")).toBeNull());
      expect(screen.queryByText("before")).toBeNull();
    });

    it("reports the full new order after a keyboard move up", async () => {
      const onReorder = vi.fn();
      renderList(onReorder, { showDropIndicator: true });

      await dragWithKeyboard("c", "ArrowUp", "Space");

      expect(onReorder).toHaveBeenCalledTimes(1);
      expect(onReorder).toHaveBeenCalledWith(["a", "c", "b"], {
        activeId: "c",
        fromIndex: 2,
        toIndex: 1,
        orderedItems: ["a", "c", "b"],
      });
    });

    it("reports nothing when the drag is cancelled", async () => {
      const onReorder = vi.fn();
      renderList(onReorder, { showDropIndicator: true });

      await dragWithKeyboard("b", "ArrowDown", "Escape");

      expect(onReorder).not.toHaveBeenCalled();
    });
  });
});
