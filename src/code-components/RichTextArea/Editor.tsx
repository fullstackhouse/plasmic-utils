import { forwardRef, useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import { Delta as DeltaType, EmitterSource, Range } from "quill/core";
import { ToolbarConfigs } from "./formatDefaultToolbarConfigs";
import Quill from "quill";
import QuillImageDropAndPaste, {
  ImageData as QuillImageData,
} from "quill-image-drop-and-paste";

Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);

export interface EditorProps {
  value?: string;
  toolbarConfigs?: ToolbarConfigs | false;
  onTextChange?: (content: string, source: EmitterSource) => void;
  onSelectionChange?: (range: Range, source: EmitterSource) => void;
  onBlur?: (range: Range, source: EmitterSource) => void;
  onFocus?: (range: Range, source: EmitterSource) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  onDrop?: (type: string, name: string, blob: Blob) => Promise<string>;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  ariaLabel?: string;
  ariaLabeledby?: string;
}

const Editor = forwardRef<Quill | null, EditorProps>(
  (
    {
      value,
      toolbarConfigs,
      onTextChange,
      onSelectionChange,
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
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const quillRef = useRef<Quill | null>(null);

    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const onBlurRef = useRef(onBlur);
    const onFocusRef = useRef(onFocus);
    const onKeyDownRef = useRef(onKeyDown);
    const onKeyUpRef = useRef(onKeyUp);
    const onDropRef = useRef(onDrop);

    async function imageDropHandler(
      type: string,
      imageData: QuillImageData & { name?: string },
    ) {
      const handlerFunction = onDropRef.current;

      if (!handlerFunction) return;

      try {
        const blob = await getBlob(imageData);
        if (!blob) throw new Error("RichTextArea: Blob is null");

        const name = imageData?.name ?? "unknown.jpg";

        return await handlerFunction(type, name, blob);
      } catch {
        throw new Error("RichTextArea: On Drop failed");
      }
    }

    useEffect(() => {
      if (quillRef.current) {
        const quill = quillRef.current;
        const editorHtml = quill.root.innerHTML.trim();

        if (value?.trim() !== editorHtml) {
          const contents = quill.clipboard.convert({ html: value ?? "" });
          quill.setContents(contents);
        }
      }
    }, [value]);

    useEffect(() => {
      if (quillRef.current) {
        const quill = quillRef.current;
        quill.enable(!readOnly);
      }
    }, [readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div"),
      );
      const quill = new Quill(editorContainer, {
        theme: "snow",
        modules: {
          toolbar: toolbarConfigs,
          imageDropAndPaste: {
            handler: async (_: string, type: string, data: QuillImageData) => {
              const imageDataWithName = data as QuillImageData & {
                name?: string;
              };

              const imageUrl = await imageDropHandler(type, imageDataWithName);

              let index = (quill.getSelection() || {}).index;
              if (index === undefined || index < 0) index = quill.getLength();
              quill.insertEmbed(index, "image", imageUrl, "user");
            },
          },
        },
        readOnly,
        placeholder,
      });

      quillRef.current = quill;

      if (typeof ref === "function") {
        ref(quill);
      } else if (ref) {
        ref.current = quill;
      }

      if (value) {
        const contents = quill.clipboard.convert({ html: value });
        quill.setContents(contents);
      }

      quill.on(
        Quill.events.TEXT_CHANGE,
        (_: DeltaType, __: DeltaType, source: EmitterSource) => {
          const content = quill.root.innerHTML
            .replace(/(^([ ]*<p><br><\/p>)*)|((<p><br><\/p>)*[ ]*$)/gi, "")
            .trim();
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);

    return (
      <div
        role="textbox"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabeledby}
        aria-readonly={readOnly}
        className={className}
        ref={containerRef}
      />
    );
  },
);

Editor.displayName = "Editor";

export default Editor;

async function getBlob(imageData: QuillImageData): Promise<Blob | null> {
  const miniImageData = await imageData.minify({
    maxWidth: 320,
    maxHeight: 320,
    quality: 0.7,
  });
  if ("message" in miniImageData) {
    return null;
  } else return miniImageData.toBlob();
}
