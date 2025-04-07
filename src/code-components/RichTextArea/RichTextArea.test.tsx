import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Screen } from "@testing-library/react";
import { RichTextArea } from "./RichTextArea";
import { useState } from "react";

afterEach(cleanup);

describe.sequential(RichTextArea.name, () => {
  it("renders", async () => {
    render(
      <RichTextArea
        toolbar={defaultToolbar}
        readOnly={false}
        className="editor-wrapper"
      />,
    );

    await waitFor(() => expectRichTextAreaToBeOnPage(screen));
  });

  it("should update content and call onChange on user input", async () => {
    const handleChange = vi.fn();

    render(
      <RichTextArea
        toolbar={defaultToolbar}
        onChange={handleChange}
        readOnly={false}
        className="editor-wrapper"
      />,
    );

    await waitFor(() => expectRichTextAreaToBeOnPage(screen));
    const editor = document.querySelector(".ql-editor") as HTMLElement;

    await userEvent.type(editor, "Test typing");

    await waitFor(() => expect(handleChange).toHaveBeenCalled());
  });

  it("should call onFocus when the editor gains focus and onBlur when loses it", async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    render(
      <RichTextArea
        toolbar={defaultToolbar}
        onFocus={onFocus}
        onBlur={onBlur}
        readOnly={false}
        className="editor-wrapper"
      />,
    );

    await waitFor(() => expectRichTextAreaToBeOnPage(screen));
    const editor = document.querySelector(".ql-editor") as HTMLElement;

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
        toolbar={defaultToolbar}
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
        readOnly={false}
        className="editor-wrapper"
      />,
    );

    await waitFor(() => expectRichTextAreaToBeOnPage(screen));

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
          <RichTextArea
            value={value}
            toolbar={defaultToolbar}
            readOnly={false}
            className="editor-wrapper"
          />
        </>
      );
    }

    render(<WrapperComponent />);
    await waitFor(() => expectRichTextAreaToBeOnPage(screen));

    const editor = document.querySelector(".ql-editor") as HTMLElement | null;
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

    render(
      <RichTextArea
        toolbar={defaultToolbar}
        readOnly={false}
        className="editor-wrapper"
      />,
    );

    await waitFor(() => expectRichTextAreaToBeOnPage(screen));
    const editor = document.querySelector(".ql-editor") as HTMLElement | null;
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
          <RichTextArea
            toolbar={defaultToolbar}
            readOnly={readOnly}
            className="editor-wrapper"
          />
        </>
      );
    }

    render(<WrapperComponent />);
    await waitFor(() => expectRichTextAreaToBeOnPage(screen));

    const editor = document.querySelector(".ql-editor") as HTMLElement | null;
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

  it("editor doesnt allow to input not allowed tags", async () => {
    render(
      <RichTextArea
        toolbar={defaultToolbar}
        readOnly={false}
        className="editor-wrapper"
      />,
    );

    await waitFor(() => expectRichTextAreaToBeOnPage(screen));
    const editor = document.querySelector(".ql-editor") as HTMLElement;

    await userEvent.type(editor, "TEST: Test typing");
    expect(screen.queryByText("TEST: Test typing")).not.toBeNull();

    await userEvent.type(editor, '<img src="test url" />');
    expect(screen.queryByText('<img src="test url" />')).not.toBeNull();

    await userEvent.type(editor, "<script>alert(1)</script>");
    expect(screen.queryByText("<script>alert(1)</script>")).toBeNull();

    await userEvent.type(
      editor,
      '<img src="http://www.erorerer.com/a.jpg" onerror="alert(1)" />',
    );
    expect(
      screen.queryByText(
        '<img src="http://www.erorerer.com/a.jpg" onerror="alert(1)" />',
      ),
    ).toBeNull();
  });
});

const defaultToolbar = {
  textStyle: ["bold", "italic", "underline", "strikethrough"],
  colors: ["text color", "text background"],
  superSubScript: true,
  fontFamily: true,
  heading: [
    "Heading 1",
    "Heading 2",
    "Heading 3",
    "Heading 4",
    "Heading 5",
    "Heading 6",
    "Body",
  ],
  fontSizes: ["small", "medium", "large", "huge"],
  formatting: [
    "alignment",
    "list",
    "indentation",
    "text direction",
    "clear formatting",
  ],
  inputTypes: ["link", "blockquote", "image", "video", "code-block", "formula"],
};

function expectRichTextAreaToBeOnPage(screen: Screen) {
  const richTextArea = screen
    .queryAllByRole("textbox")
    .some((el) => el.tagName === "DIV");

  expect(richTextArea).toBeTruthy();
}
