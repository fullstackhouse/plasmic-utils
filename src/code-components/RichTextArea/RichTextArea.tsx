import { useMemo, useState, useEffect } from "react";
import { Range } from "quill/core";
import {
  formatDefaultToolbarConfigs,
  Toolbar,
  ToolbarConfigs,
} from "./formatDefaultToolbarConfigs";
import { EditorFallback } from "./EditorFallback";

interface RichTextAreaProps {
  value?: string;
  toolbar: Toolbar;
  customToolbar?: ToolbarConfigs;
  onSelectionChange?: (range: Range | null, source: string) => void;
  onChange?: (content: string, source: string) => void;
  onBlur?: (range: Range | null, source: string) => void;
  onFocus?: (range: Range | null, source: string) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  onDrop?: (type: string, name: string, blob: Blob) => Promise<string>;
  placeholder?: string;
  readOnly: boolean;
  className: string;
  ariaLabel?: string;
  ariaLabeledby?: string;
}

export function RichTextArea({
  value,
  toolbar,
  customToolbar,
  onSelectionChange,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  onDrop,
  placeholder,
  readOnly,
  className,
  ariaLabel,
  ariaLabeledby,
}: RichTextAreaProps) {
  const formattedToolbar = useMemo(
    () => formatDefaultToolbarConfigs(toolbar),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(toolbar)],
  );
  const currentToolbarConfigs = customToolbar?.length
    ? customToolbar
    : formattedToolbar.length
      ? formattedToolbar
      : false;

  const [isMounted, setIsMounted] = useState(false);
  const [Editor, setEditor] = useState<
    null | typeof import("./Editor").default
  >(null);

  useEffect(() => {
    setIsMounted(true);
    import("./Editor").then((mod) => setEditor(() => mod.default));
  }, []);

  if (!isMounted || !Editor) {
    return (
      <EditorFallback
        value={value}
        placeholder={placeholder}
        className={className}
      />
    );
  }

  return (
    <Editor
      toolbarConfigs={currentToolbarConfigs}
      readOnly={readOnly}
      value={value}
      placeholder={placeholder}
      onSelectionChange={onSelectionChange}
      onTextChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onDrop={onDrop}
      className={className}
      ariaLabel={ariaLabel}
      ariaLabeledby={ariaLabeledby}
    />
  );
}
