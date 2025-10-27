import { useState } from "react";
import { useIsomorphicLayoutEffect } from "../../common/useIsomorphicLayoutEffect";

export interface ReactQuillPackages {
  ReactQuill: any;
  QuillImageDropAndPaste: any;
}

export function useReactQuillPackages(): ReactQuillPackages | undefined {
  const [packages, setPackages] = useState<{
    ReactQuill: any;
    QuillImageDropAndPaste: any;
  }>();

  useIsomorphicLayoutEffect(() => {
    (async function () {
      const ReactQuill = await import("react-quill-new");
      const QuillImageDropAndPaste = await import("quill-image-drop-and-paste");

      ReactQuill.Quill.register(
        "modules/imageDropAndPaste",
        QuillImageDropAndPaste.default,
      );

      setTimeout(() => {
        setPackages(() => ({
          ReactQuill,
          QuillImageDropAndPaste,
        }));
      }, 0);
    })();
  }, []);

  return packages;
}
