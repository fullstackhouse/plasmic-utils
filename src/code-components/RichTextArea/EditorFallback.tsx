export function EditorFallback({
  value,
  placeholder,
  className,
}: {
  value?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        className="ql-toolbar ql-snow"
        style={{ height: "44px", boxSizing: "border-box" }}
      ></div>
      <div className="ql-container ql-snow">
        <div className="ql-editor">
          {value ? value : placeholder ? placeholder : ""}
        </div>
      </div>
    </div>
  );
}
