import "quill/dist/quill.snow.css";
import type ReactQuill from "react-quill-new";

export function QuillPlaceholder({
  value,
  placeholder,
  className,
  style,
}: ReactQuill.ReactQuillProps & {
  value?: string;
}) {
  return (
    <div className={`quill ${className}`} style={style}>
      <div
        className="ql-toolbar ql-snow"
        style={{ height: "52px", boxSizing: "border-box" }}
      ></div>
      <div className="ql-container ql-snow">
        {value ? (
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        ) : (
          <div className="ql-editor ql-blank" data-placeholder={placeholder}>
            <p>
              <br />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
