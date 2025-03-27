import React, { useMemo, useRef } from "react";
import Quill, { Range } from "quill/core";
import {
  formatDefaultToolbarConfigs,
  Toolbar,
  ToolbarConfigs,
} from "./formatDefaultToolbarConfigs";
import dynamic from "next/dynamic";

interface RichTextAreaProps {
  htmlValue?: string;
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
  htmlValue,
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
  const Editor = useMemo(() => {
    return dynamic(() => import("./Editor").then((module) => module.Editor), {
      ssr: false,
    });
  }, []);
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
      defaultValue={htmlValue}
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
