import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Combobox } from "./Combobox";

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
