import type { ImageData } from "quill-image-drop-and-paste";
import "quill/dist/quill.snow.css";
import { CSSProperties, useMemo, useRef } from "react";
import type ReactQuillNew from "react-quill-new";
import styles from "./quill.module.css";
import { QuillPlaceholder } from "./QuillPlaceholder";
import { useToolbar } from "./toolbar";
import { useImageUpload } from "./useImageUpload";
import { useReactQuillPackages } from "./useReactQuillPackages";

const style: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

export function RichTextArea(
  props: ReactQuillNew.ReactQuillProps & {
    value?: string;
    toolbar?: any;
    customToolbar?: any[];
    onImageUpload?(image: ImageData): Promise<string>;
    onImageUploadError?(error: unknown): void;
    onImageUploadingChange?(value: boolean): void;
  },
) {
  const pkgs = useReactQuillPackages() as any;
  const quillRef = useRef<ReactQuillNew>();

  const {
    toolbar,
    customToolbar,
    className,
    onImageUpload,
    onImageUploadError,
    onImageUploadingChange,
    ...reactQuillProps
  } = props;
  const actualToolbar = useToolbar({
    toolbar: props.toolbar,
    customToolbar: props.customToolbar,
  });

  const imageEnabled = !props.formats || props.formats.includes("image");
  const { imageHandler, imageUploading } = useImageUpload({
    pkgs,
    quillRef,
    onImageUpload: imageEnabled ? onImageUpload : undefined,
    onImageUploadError,
    onImageUploadingChange,
  });

  const modules = useMemo(() => {
    return {
      toolbar: actualToolbar,
      imageDropAndPaste: !imageHandler
        ? undefined
        : {
            handler: imageHandler,
          },
    };
  }, [actualToolbar, imageHandler]);

  const actualClassName = `${className} ${styles.container} ${imageUploading ? styles.containerImageUploading : ""}`;

  if (!pkgs) {
    return (
      <QuillPlaceholder
        {...reactQuillProps}
        className={actualClassName}
        style={style}
      />
    );
  }

  return (
    <pkgs.ReactQuill.default
      {...reactQuillProps}
      ref={quillRef}
      className={actualClassName}
      style={style}
      modules={modules}
    />
  );
}
