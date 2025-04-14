import type ImageDropAndPaste from "quill-image-drop-and-paste";
import type { ImageData } from "quill-image-drop-and-paste";
import "quill/dist/quill.snow.css";
import { RefObject, useCallback, useMemo, useState } from "react";
import type ReactQuillNew from "react-quill-new";
import { Quill } from "react-quill-new";
import { useCurrentRef } from "../../common/useCurrentRef";
import { useQuillOnInit } from "./useQuillOnInit";
import { ReactQuillPackages } from "./useReactQuillPackages";

export function useImageUpload({
  pkgs,
  quillRef,
  onImageUpload,
  onImageUploadError,
  onImageUploadingChange,
}: {
  pkgs: ReactQuillPackages;
  quillRef: RefObject<ReactQuillNew | undefined>;
  onImageUpload?(image: ImageData): Promise<string>;
  onImageUploadError?(error: unknown): void;
  onImageUploadingChange?(value: boolean): void;
}): {
  imageHandler?: ImageDropAndPaste["option"]["handler"];
  imageUploading: boolean;
} {
  const [imageUploading, setImageUploading] = useState(false);
  const onImageUploadRef = useCurrentRef(onImageUpload);
  const onImageUploadErrorRef = useCurrentRef(onImageUploadError);
  const onImageUploadingChangeRef = useCurrentRef(onImageUploadingChange);

  const changeImageUploading = useCallback(
    (value: boolean) => {
      setImageUploading(value);
      onImageUploadingChangeRef.current?.(value);
    },
    [onImageUploadingChangeRef],
  );

  const imageHandler = useMemo(() => {
    if (!onImageUploadRef.current) {
      return undefined;
    }

    return (async (dataUrl, type, data) => {
      if (!data) {
        return;
      }

      changeImageUploading(true);

      let uploadedImageUrl: string;
      try {
        uploadedImageUrl = await onImageUploadRef.current!(data!);
      } catch (error) {
        onImageUploadErrorRef.current?.(error);
        changeImageUploading(false);
        return;
      }

      const quill = quillRef.current?.getEditor();
      if (!quill) {
        changeImageUploading(false);
        return;
      }

      insertImage(quill, uploadedImageUrl);
      changeImageUploading(false);
    }) satisfies ImageDropAndPaste["option"]["handler"];
  }, [onImageUploadErrorRef, onImageUploadRef, changeImageUploading, quillRef]);

  useToolbarImageHandler({
    pkgs,
    quillRef,
    imageHandler,
  });

  return { imageHandler, imageUploading };
}

function insertImage(quill: Quill, imageUrl: string) {
  let index = quill.getSelection()?.index;
  if (index === undefined || index < 0) index = quill.getLength();
  quill.insertEmbed(index, "image", imageUrl, "user");
}

function useToolbarImageHandler({
  pkgs,
  quillRef,
  imageHandler,
}: {
  pkgs: ReactQuillPackages;
  quillRef: RefObject<ReactQuillNew | undefined>;
  imageHandler:
    | ((
        dataUrl: string | ArrayBuffer,
        type?: string,
        imageData?: ImageData,
      ) => void)
    | undefined;
}) {
  useQuillOnInit({
    pkgs,
    quillRef,
    onInit: useCallback(
      (quill: Quill) => {
        if (!imageHandler) {
          return;
        }
        const toolbar = quill.getModule("toolbar") as any;
        toolbar.addHandler("image", function (clicked: boolean) {
          if (clicked) {
            let fileInput = quill.container.querySelector<HTMLInputElement>(
              "input.ql-image[type=file]",
            );

            if (fileInput == null) {
              fileInput = document.createElement("input");
              fileInput.setAttribute("type", "file");
              fileInput.setAttribute(
                "accept",
                "image/png, image/gif, image/jpeg, image/bmp, image/x-icon",
              );
              fileInput.classList.add("ql-image");
              fileInput.addEventListener("change", function (changeEvent) {
                const files = (changeEvent.target as HTMLInputElement).files!;
                let file: File;
                if (files.length > 0) {
                  file = files[0];
                  const type = file.type;
                  const reader = new FileReader();
                  reader.onload = (loadEvent) => {
                    const dataUrl = loadEvent.target?.result;
                    if (!dataUrl) {
                      return;
                    }

                    imageHandler(
                      dataUrl,
                      type,
                      new pkgs.QuillImageDropAndPaste.ImageData(
                        dataUrl,
                        type,
                        file.name,
                      ),
                    );
                    fileInput!.value = "";
                  };
                  reader.readAsDataURL(file);
                }
              });
            }

            fileInput.click();
          }
        });
      },
      [pkgs, imageHandler],
    ),
  });
}
