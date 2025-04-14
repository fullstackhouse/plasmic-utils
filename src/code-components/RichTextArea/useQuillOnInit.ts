import "quill/dist/quill.snow.css";
import { RefObject, useEffect } from "react";
import type ReactQuillNew from "react-quill-new";
import { Quill } from "react-quill-new";
import { ReactQuillPackages } from "./useReactQuillPackages";

/**
 * Runs `onInit` after quill is initialized.
 */
export function useQuillOnInit({
  pkgs,
  quillRef,
  onInit,
}: {
  pkgs: ReactQuillPackages;
  quillRef: RefObject<ReactQuillNew | undefined>;
  onInit(quill: Quill): void;
}) {
  useEffect(() => {
    if (!pkgs) {
      return;
    }

    // There's no `onInit` prop in `<ReactQuill />`, so we'll just run code after 1s - quill should be rendered by then;
    // and user probably won't interact with the editor before that time anyways.
    setTimeout(() => {
      const quill = quillRef.current?.getEditor();
      if (!quill) {
        console.error("quill editor unavailable; skipping on init script");
        return;
      }

      onInit(quill);
    }, 1000);
  }, [pkgs, quillRef, onInit]);
}
