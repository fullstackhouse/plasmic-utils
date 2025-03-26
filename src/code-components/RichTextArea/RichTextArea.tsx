import React, { useMemo, useRef, useState } from 'react';
import { Editor } from './Editor';
import { Range } from 'quill/core';
import { formatDefaultToolbarConfigs, Toolbar, ToolbarConfigs } from './formatDefaultToolbarConfigs';

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
  const [range, setRange] = useState<Range | null>(null);
  const [lastChange, setLastChange] = useState<string>();

  const quillRef = useRef();

  const formattedToolbar = useMemo(() => formatDefaultToolbarConfigs(toolbar), [JSON.stringify(toolbar)]);
  const currentToolbarConfigs = customToolbar ? customToolbar : formattedToolbar;

  return (
    <div>
      <Editor
        ref={quillRef}
        toolbar={currentToolbarConfigs}
        readOnly={readOnly}
        defaultValue={htmlValue}
        placeholder={placeholder}
        onSelectionChange={(range, source) => {
          setRange(range);
          onSelectionChange?.(range, source);
        }}
        onTextChange={(content, source) => {
          setLastChange(content);
          onChange?.(content, source);
        }}
      />
      <div>
        <button
          className="controls-right"
          type="button"
          onClick={() => {
            alert(quillRef.current?.getLength());
          }}
        >
          Get Content Length
        </button>
      </div>
      <div className="state">
        <div className="state-title">Current Range:</div>
        {range ? JSON.stringify(range) : 'Empty'}
      </div>
      <div className="state">
        <div className="state-title">Last Change:</div>
        {lastChange ? JSON.stringify(lastChange.ops) : 'Empty'}
      </div>
    </div>
  );
};