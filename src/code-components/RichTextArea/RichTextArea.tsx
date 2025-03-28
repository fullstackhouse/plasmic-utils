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
  placeholder,
  readOnly,
  className,
  ariaLabel,
  ariaLabeledby,
}: RichTextAreaProps) {
  const formattedToolbar = useMemo(
    () => formatDefaultToolbarConfigs(toolbar),
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

    () => {
      setIsMounted(false);
    };
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
      className={className}
      ariaLabel={ariaLabel}
      ariaLabeledby={ariaLabeledby}
    />
  );
}
