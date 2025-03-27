import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Screen } from "@testing-library/react";
import { RichTextArea } from "./RichTextArea";

afterEach(cleanup);

describe.sequential(RichTextArea.name, () => {
  it("should render component correctly", async () => {
    render(
      <RichTextArea
        toolbar={defaultToolbar}
        readOnly={false}
        wrapperClassName="editor-wrapper"
        fallback={fallback}
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
        wrapperClassName="editor-wrapper"
        fallback={fallback}
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
        wrapperClassName="editor-wrapper"
        fallback={fallback}
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
        wrapperClassName="editor-wrapper"
        fallback={fallback}
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

const fallback = <div>Example fallback</div>;

function expectRichTextAreaToBeOnPage(screen: Screen) {
  const richTextArea = screen
    .queryAllByRole("textbox")
    .some((el) => el.tagName === "DIV");

  expect(richTextArea).toBeTruthy();
}
