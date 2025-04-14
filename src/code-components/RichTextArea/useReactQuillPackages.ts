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
      const Quill = await import("quill");
      const ReactQuill = await import("react-quill-new");
      const QuillImageDropAndPaste = await import("quill-image-drop-and-paste");

      Quill.default.register(
        "modules/imageDropAndPaste",
        QuillImageDropAndPaste.default,
      );

      setPackages(() => ({
        ReactQuill,
        QuillImageDropAndPaste,
      }));
    })();
  }, []);

  return packages;
}
