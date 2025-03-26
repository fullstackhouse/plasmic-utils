import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import { Delta as DeltaType, EmitterSource, Range } from "quill/core";
import { ToolbarConfigs } from "./formatDefaultToolbarConfigs";

const Quill =
  typeof window === "object" ? require("quill").default : () => false;

interface EditorProps {
  defaultValue?: DeltaType | string;
  toolbar?: ToolbarConfigs;
  onTextChange?: (content: string, source: EmitterSource) => void;
  onSelectionChange?: (range: Range, source: EmitterSource) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export const Editor = forwardRef<typeof Quill | null, EditorProps>(
  (
    {
      defaultValue,
      toolbar,
      onTextChange,
      onSelectionChange,
      placeholder,
      readOnly,
    },
    ref,
  ) => {
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
        container.ownerDocument.createElement("div"),
      );
      const quill = new Quill(editorContainer, {
        theme: "snow",
        modules: {
          toolbar,
        },
        readOnly,
        placeholder,
      });

      if (typeof ref === "function") {
        ref(quill);
      } else if (ref) {
        ref.current = quill;
      }

      if (defaultValueRef.current) {
        if (typeof defaultValueRef.current === "string") {
          quill.clipboard.dangerouslyPasteHTML(defaultValueRef.current);
        } else {
          quill.setContents(defaultValueRef.current);
        }
      }

      quill.on(
        Quill.events.TEXT_CHANGE,
        (_: DeltaType, __: DeltaType, source: EmitterSource) => {
          const content = quill.root.innerHTML;
          onTextChangeRef.current?.(content, source);
        },
      );

      quill.on(
        Quill.events.SELECTION_CHANGE,
        (range: Range, _: Range, source: EmitterSource) => {
          onSelectionChangeRef.current?.(range, source);
        },
      );

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

Editor.displayName = "Editor";
