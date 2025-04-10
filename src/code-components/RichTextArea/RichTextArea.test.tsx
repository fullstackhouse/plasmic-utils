import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RichTextArea } from "./RichTextArea";

afterEach(cleanup);

describe.sequential(RichTextArea.name, () => {
  it("renders", async () => {
    render(<RichTextArea />);

    await waitFor(() => expectRichTextAreaToBePresent());
  });

  it("should update content and call onChange on user input", async () => {
    const handleChange = vi.fn();

    render(<RichTextArea onChange={handleChange} />);

    await waitFor(() => expectRichTextAreaToBePresent());
    const editor = document.querySelector<HTMLElement>(".ql-editor")!;

    await userEvent.type(editor, "Test typing");

    await waitFor(() => {
      expect(editor.innerHTML).toContain("Test typing");
    });
    await waitFor(() => expect(handleChange).toHaveBeenCalled());
  });

  it("should call onFocus when the editor gains focus and onBlur when loses it", async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    render(<RichTextArea onFocus={onFocus} onBlur={onBlur} />);

    await waitFor(() => expectRichTextAreaToBePresent());
    const editor = document.querySelector<HTMLElement>(".ql-editor")!;

    userEvent.click(editor);

    await waitFor(() => {
      expect(onFocus).toHaveBeenCalled();
    });

    userEvent.click(document.body);

    await waitFor(() => {
      expect(onBlur).toHaveBeenCalled();
    });
  });

  it("should display custom toolbar correctly", async () => {
    render(
      <RichTextArea
        customToolbar={[
          ["bold", "italic"],
          [
            {
              list: "ordered",
            },
            {
              list: "bullet",
            },
          ],
          [
            {
              color: [],
            },
            {
              background: [],
            },
          ],
          ["link"],
          ["clean"],
        ]}
      />,
    );

    await waitFor(() => expectRichTextAreaToBePresent());

    const underlineButton = screen.queryByRole("button", {
      name: /underline/i,
    });
    const strikethroughButton = screen.queryByRole("button", {
      name: /strikethrough/i,
    });
    const boldButton = screen.queryByRole("button", { name: /bold/i });
    const italicButton = screen.queryByRole("button", { name: /italic/i });

    expect(underlineButton).toBeNull();
    expect(strikethroughButton).toBeNull();
    expect(boldButton).toBeDefined();
    expect(italicButton).toBeDefined();

    const orderedListButton = screen.getByRole("button", {
      name: /list: ordered/i,
    });
    const bulletListButton = screen.getByRole("button", {
      name: /list: bullet/i,
    });

    expect(orderedListButton).toBeDefined();
    expect(bulletListButton).toBeDefined();

    const colorPickers = document.querySelectorAll(".ql-picker-label");
    expect(colorPickers.length).toBe(2);

    const linkButton = screen.queryByRole("button", { name: /link/i });
    expect(linkButton).toBeDefined();

    const cleanButton = screen.queryByRole("button", { name: /clean/i });
    expect(cleanButton).toBeDefined();
  });

  it("editor content gets updated when rich text area receives a new value", async () => {
    const initialHtmlValue = "<p>Initial content</p>";
    const updatedHtmlValue = "<p>Updated content</p>";

    function WrapperComponent() {
      const [value, setValue] = useState(initialHtmlValue);

      return (
        <>
          <button onClick={() => setValue(updatedHtmlValue)}>Update</button>
          <RichTextArea value={value} />
        </>
      );
    }

    render(<WrapperComponent />);
    await waitFor(() => expectRichTextAreaToBePresent());

    const editor = document.querySelector<HTMLElement>(".ql-editor");
    expect(editor).not.toBeNull();

    await waitFor(() => {
      expect(editor?.innerHTML).toContain("Initial content");
    });

    userEvent.click(screen.getByRole("button", { name: /update/i }));

    await waitFor(() => {
      expect(editor?.innerHTML).toContain("Updated content");
    });
  });

  it("editor correctly updates on paste", async () => {
    document.createRange = () => {
      const range = new Range();

      range.getBoundingClientRect = () => new DOMRect(0, 0, 0, 0);
      range.getClientRects = () => [] as unknown as DOMRectList;

      return range;
    };

    render(<RichTextArea />);

    await waitFor(() => expectRichTextAreaToBePresent());
    const editor = document.querySelector<HTMLElement>(".ql-editor");
    expect(editor).not.toBeNull();

    await waitFor(() => {
      editor?.focus();
      userEvent.paste("Pasted data");
    });

    await waitFor(() => {
      expect(editor?.innerHTML).toContain("Pasted data");
    });
  });

  it("editor should respond to change read only value", async () => {
    function WrapperComponent() {
      const [readOnly, setReadOnly] = useState(false);

      return (
        <>
          <button onClick={() => setReadOnly(true)}>Update</button>
          <RichTextArea readOnly={readOnly} />
        </>
      );
    }

    render(<WrapperComponent />);
    await waitFor(() => expectRichTextAreaToBePresent());

    const editor = document.querySelector<HTMLElement>(".ql-editor");
    expect(editor).not.toBeNull();

    await userEvent.type(editor as HTMLElement, "First");
    await waitFor(() => {
      expect(editor?.innerHTML).toContain("First");
    });

    userEvent.click(screen.getByRole("button", { name: /update/i }));

    await userEvent.type(editor as HTMLElement, "Second");
    await waitFor(() => {
      expect(editor?.innerHTML).toContain("First");
    });
  });
});

function expectRichTextAreaToBePresent() {
  expect(document.querySelector(".ql-tooltip")).toBeTruthy();
}
