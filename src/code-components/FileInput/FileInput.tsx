import { ChangeEvent, ReactNode, useRef } from "react";
import { FILE_TYPES } from "./FileInput.register";
import { MemoDataProvider } from "../MemoDataProvider/MemoDataProvider";

interface FileInputProps {
  name: string;
  onChange?(files: File[]): void;
  types?: (keyof typeof FILE_TYPES | string)[];
  multiple?: boolean;
  maxSize?: number;
  children: ReactNode;
}

export function FileInput({
  name,
  onChange,
  types,
  multiple,
  maxSize,
  children,
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentTypes =
    types?.flatMap((type) =>
      type in FILE_TYPES ? FILE_TYPES[type as keyof typeof FILE_TYPES] : [type],
    ) ?? [];

  async function handleFilesChange(e: ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;

    const files = Array.from(fileList);
    const validFiles = files.filter((file) =>
      isFileValid(file, currentTypes, maxSize),
    );

    if (validFiles.length > 0) {
      onChange?.(validFiles);
    }

    return;
  }

  function handleClick() {
    inputRef.current?.click();
  }

  const accept = getAccept(currentTypes);

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        accept={accept}
        multiple={multiple}
        onChange={handleFilesChange}
        hidden
      />
      <MemoDataProvider
        name={name}
        data={{
          openFilePicker: handleClick,
        }}
        deps={[]}
      >
        {children}
      </MemoDataProvider>
    </>
  );
}

function getAccept(types: string[]) {
  if (!types.length) return undefined;
  return types.join(",");
}

function isFileValid(file: File, allowedFormats: string[], maxSize?: number) {
  return (
    isFileSizeValid(file, maxSize) && isFileFormatValid(file, allowedFormats)
  );
}

function isFileSizeValid(file: File, maxSize?: number) {
  if (maxSize && file.size > maxSize) {
    return false;
  }
  return true;
}

function isFileFormatValid(file: File, allowedFormats: string[]) {
  if (!allowedFormats.length) return true;

  const normalizedFileFormats = allowedFormats.map((format) =>
    format.trim().toLowerCase(),
  );
  const mimeType = file.type.toLowerCase();
  const fileNameParts = file.name.toLowerCase().split(".");
  const fileExtension =
    fileNameParts.length > 1 ? `.${fileNameParts.pop()}` : "";

  return normalizedFileFormats.some(
    (format) =>
      format === fileExtension ||
      format === mimeType ||
      (format.endsWith("/*") &&
        mimeType.startsWith(format.split("/")[0] + "/")),
  );
}
