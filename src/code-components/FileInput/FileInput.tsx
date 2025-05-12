import { ChangeEvent, ReactNode, useRef } from "react";
import { FILE_TYPES } from "./FileInput.register";

interface FileInputProps {
  onChange?(files: File[]): void;
  types?: string[];
  customTypes?: string[];
  multiple?: boolean;
  maxSize?: number;
  className?: string;
  children: ReactNode;
}

export function FileInput({
  onChange,
  types,
  customTypes,
  multiple,
  maxSize,
  className,
  children,
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentTypes =
    customTypes ??
    types?.flatMap((key) => FILE_TYPES[key as keyof typeof FILE_TYPES]) ??
    [];

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
      <div onClick={handleClick} className={className}>
        {children}
      </div>
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
