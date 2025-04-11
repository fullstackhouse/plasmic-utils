import type ReactQuillNew from "react-quill-new";
import { useIsomorphicLayoutEffect } from "../../common/useIsomorphicLayoutEffect";
import { useState } from "react";

export type ReactQuill = React.FC<ReactQuillNew.ReactQuillProps>;

export function useReactQuill(): ReactQuill | undefined {
  const [quill, setQuill] = useState<ReactQuill>();

  useIsomorphicLayoutEffect(() => {
    import("react-quill-new").then((module) => {
      setQuill(() => module.default as unknown as ReactQuill);
    });
  }, []);

  return quill;
}
