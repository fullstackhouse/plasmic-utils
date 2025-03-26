import React, { useRef, useState } from 'react';
import { Editor } from './Editor';
import { Range } from 'quill/core';

interface RichTextAreaProps {
  htmlValue: string;
  onSelectionChange?: (range: Range | null, source: string) => void;
  onChange?: (content: string, source: string) => void;
  readOnly: boolean;
}

export function RichTextArea({
  readOnly,
  htmlValue,
  onSelectionChange,
  onChange,
}: RichTextAreaProps) {
  const [range, setRange] = useState<Range | null>(null);
  const [lastChange, setLastChange] = useState<string>();

  const quillRef = useRef();

  return (
    <div>
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={htmlValue}
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