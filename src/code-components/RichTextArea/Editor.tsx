import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import 'quill/dist/quill.snow.css'
import { Delta as DeltaType } from "quill"
import { EmitterSource, Range } from 'quill';

const Quill = typeof window === 'object' ? require('quill').default : () => false;

interface EditorProps {
  readOnly?: boolean;
  defaultValue?: DeltaType | string;
  onTextChange?: (delta: DeltaType, oldContent: DeltaType, source: EmitterSource) => void;
  onSelectionChange?: (range: Range, oldRange: Range, source: EmitterSource) => void;
}

export const Editor = forwardRef<typeof Quill | null, EditorProps>(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        ref.current.enable(!readOnly);
      }
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div'),
      );
      const quill = new Quill(editorContainer, {
        theme: 'snow',
      });

      if (typeof ref === "function") {
        ref(quill);
      } else if (ref) {
        ref.current = quill;
      }

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (delta: DeltaType, oldContent: DeltaType, source: EmitterSource) => {
        onTextChangeRef.current?.(delta, oldContent, source);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (range: Range, oldRange: Range, source: EmitterSource) => {
        onSelectionChangeRef.current?.(range, oldRange, source);
      });

      return () => {
        if (typeof ref === "function") {
          ref(null);
        } else if (ref) {
          ref.current = null;
        }
        container.innerHTML = "";
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  },
);

Editor.displayName = 'Editor';