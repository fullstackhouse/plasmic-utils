import React, { useMemo, useRef } from "react";
import { Editor } from "./Editor";
import { Range } from "quill/core";
import {
  formatDefaultToolbarConfigs,
  Toolbar,
  ToolbarConfigs,
} from "./formatDefaultToolbarConfigs";

interface RichTextAreaProps {
  htmlValue?: string;
  toolbar: Toolbar;
  customToolbar?: ToolbarConfigs;
  onSelectionChange?: (range: Range | null, source: string) => void;
  onChange?: (content: string, source: string) => void;
  placeholder?: string;
  readOnly: boolean;
}

export function RichTextArea({
  htmlValue,
  toolbar,
  customToolbar,
  onSelectionChange,
  onChange,
  placeholder,
  readOnly,
}: RichTextAreaProps) {
  const quillRef = useRef();

  const formattedToolbar = useMemo(
    () => formatDefaultToolbarConfigs(toolbar),
    [JSON.stringify(toolbar)],
  );
  const currentToolbarConfigs = customToolbar
    ? customToolbar
    : formattedToolbar;

  return (
    <div>
      <Editor
        ref={quillRef}
        toolbar={currentToolbarConfigs}
        readOnly={readOnly}
        defaultValue={htmlValue}
        placeholder={placeholder}
        onSelectionChange={(range, source) =>
          onSelectionChange?.(range, source)
        }
        onTextChange={(content, source) => onChange?.(content, source)}
      />
    </div>
  );
}
