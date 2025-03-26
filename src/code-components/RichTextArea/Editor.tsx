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
  onBlur?: (range: Range, source: EmitterSource) => void;
  onFocus?: (range: Range, source: EmitterSource) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  placeholder?: string;
  readOnly?: boolean;
  wrapperClassName?: string;
}

export const Editor = forwardRef<typeof Quill | null, EditorProps>(
  (
    {
      defaultValue,
      toolbar,
      onTextChange,
      onSelectionChange,
      onBlur,
      onFocus,
      onKeyDown,
      onKeyUp,
      placeholder,
      readOnly,
      wrapperClassName,
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const onBlurRef = useRef(onBlur);
    const onFocusRef = useRef(onFocus);
    const onKeyDownRef = useRef(onKeyDown);
    const onKeyUpRef = useRef(onKeyUp);

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

          if (!range) {
            onBlurRef.current?.(range, source);
          } else {
            onFocusRef.current?.(range, source);
          }
        },
      );

      const editorRoot = quill.root;

      editorRoot.addEventListener("keydown", (event: KeyboardEvent) =>
        onKeyDownRef.current?.(event),
      );

      editorRoot.addEventListener("keyup", (event: KeyboardEvent) =>
        onKeyUpRef.current?.(event),
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

    return <div className={wrapperClassName} ref={containerRef}></div>;
  },
);

Editor.displayName = "Editor";
