import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePlasmicCanvasContext } from "@plasmicapp/react-web/lib/host";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Combobox } from "./Combobox";

vi.mock("@plasmicapp/react-web/lib/host", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  usePlasmicCanvasContext: vi.fn(),
}));

afterEach(cleanup);

describe("Combobox", () => {
  it("leaves the page scrollable and interactive while the menu is open", async () => {
    render(
      <>
        <Combobox
          aria-label="Department"
          leftIcon={null}
          rightIcon={null}
          options={[
            { value: 1, label: "Cardiology" },
            { value: 2, label: "Neurology" },
          ]}
        />
        <button>Outside</button>
      </>,
    );

    await userEvent.click(screen.getByRole("combobox"));
    await waitFor(() => {
      expect(screen.getByRole("option", { name: "Cardiology" })).toBeTruthy();
    });

    expect(document.documentElement.style.overflow).not.toBe("hidden");
    expect(
      screen.getByRole("button", { name: "Outside" }).closest("[inert]"),
    ).toBeNull();
  });
});

describe("Combobox menu placement", () => {
  const openMenu = async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Combobox
        leftIcon={null}
        rightIcon={null}
        options={[{ value: "first", label: "First" }]}
      />,
    );
    await user.click(screen.getByRole("combobox"));
    const option = await screen.findByRole("option", { name: "First" });
    return { container, option };
  };

  beforeEach(() => {
    vi.mocked(usePlasmicCanvasContext).mockReturnValue(false);
  });

  it("renders inside the component in design mode on the canvas", async () => {
    vi.mocked(usePlasmicCanvasContext).mockReturnValue({
      componentName: null,
      globalVariants: {},
      interactive: false,
    });
    const { container, option } = await openMenu();
    expect(container.contains(option)).toBe(true);
  });

  it("portals out of the component in interactive mode on the canvas", async () => {
    vi.mocked(usePlasmicCanvasContext).mockReturnValue({
      componentName: null,
      globalVariants: {},
      interactive: true,
    });
    const { container, option } = await openMenu();
    expect(container.contains(option)).toBe(false);
  });

  it("portals out of the component outside the canvas", async () => {
    const { container, option } = await openMenu();
    expect(container.contains(option)).toBe(false);
  });
});
