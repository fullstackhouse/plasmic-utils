import QuillImageDropAndPaste from "quill-image-drop-and-paste";
import { useState } from "react";
import type ReactQuillNew from "react-quill-new";
import { useIsomorphicLayoutEffect } from "../../common/useIsomorphicLayoutEffect";

export type ReactQuill = React.FC<ReactQuillNew.ReactQuillProps>;

export function useReactQuill(): ReactQuill | undefined {
  const [ReactQuill, setReactQuill] = useState<ReactQuill>();

  useIsomorphicLayoutEffect(() => {
    (async function () {
      const Quill = await import("quill");
      const ReactQuill = await import("react-quill-new");

      Quill.default.register(
        "modules/imageDropAndPaste",
        QuillImageDropAndPaste,
      );

      setReactQuill(() => ReactQuill.default as unknown as ReactQuill);
    })();
  }, []);

  return ReactQuill;
}
