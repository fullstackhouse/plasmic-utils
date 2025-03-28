import { useMemo, lazy } from "react";
import { Range } from "quill/core";
import {
  formatDefaultToolbarConfigs,
  Toolbar,
  ToolbarConfigs,
} from "./formatDefaultToolbarConfigs";

const Editor = lazy(() =>
  import("./Editor").then((module) => ({ default: module.Editor })),
);

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
  wrapperClassName: string;
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
  wrapperClassName,
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
      wrapperClassName={wrapperClassName}
      ariaLabel={ariaLabel}
      ariaLabeledby={ariaLabeledby}
    />
  );
}
