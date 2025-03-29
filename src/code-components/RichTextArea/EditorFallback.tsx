import "quill/dist/quill.snow.css";

export function EditorFallback({
  value,
  placeholder,
  className,
}: {
  value?: string;
  placeholder?: string;
  className?: string;
}) {
  const actualValue = value ? value : placeholder ? placeholder : "<p></p>";
  return (
    <div className={className}>
      <div
        className="ql-toolbar ql-snow"
        style={{ height: "44px", boxSizing: "border-box" }}
      ></div>
      <div className="ql-container ql-snow">
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: actualValue }}
        />
      </div>
    </div>
  );
}
