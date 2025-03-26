import React, { useRef, useState } from 'react';
import { Editor } from './Editor';
import { Range } from 'quill/core';

interface RichTextAreaProps {
  disabled: boolean;
  defaultValue: string;
  onSelectionChange?: (range: Range | null, source: string) => void;
  onChange?: (content: string, source: string) => void;
}

export function RichTextArea({
  disabled,
  defaultValue,
  onSelectionChange,
  onChange,
}: RichTextAreaProps) {
  const [range, setRange] = useState<Range | null>(null);
  const [lastChange, setLastChange] = useState<string>();
  const [readOnly, setReadOnly] = useState(false);

  const quillRef = useRef();

  return (
    <div>
      <Editor
        ref={quillRef}
        readOnly={disabled}
        defaultValue={defaultValue}
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
        <label>
          Read Only:{' '}
          <input
            type="checkbox"
            value={readOnly}
            onChange={(e) => setReadOnly(e.target.checked)}
          />
        </label>
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