import { CSSProperties, useMemo } from "react";
import type ReactQuillNew from "react-quill-new";
import { QuillPlaceholder } from "./QuillPlaceholder";
import { useToolbar } from "./toolbar";
import { useReactQuill } from "./useReactQuill";

const style: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

export function RichTextArea(
  props: ReactQuillNew.ReactQuillProps & {
    value?: string;
    toolbar?: any;
    customToolbar?: any[];
  },
) {
  const ReactQuill = useReactQuill();

  const { toolbar, customToolbar, ...reactQuillProps } = props;
  const actualToolbar = useToolbar({
    toolbar: props.toolbar,
    customToolbar: props.customToolbar,
  });
  const modules = useMemo(
    () => ({
      toolbar: actualToolbar,
    }),
    [actualToolbar],
  );
  const key = useMemo(() => JSON.stringify(modules), [modules]);

  if (!ReactQuill) {
    return <QuillPlaceholder {...reactQuillProps} style={style} />;
  }

  return (
    <ReactQuill
      {...reactQuillProps}
      key={key}
      style={style}
      modules={modules}
    />
  );
}
