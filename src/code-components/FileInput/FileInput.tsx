import { ChangeEvent, ReactNode, useRef } from "react";
import { FILE_TYPES } from "./FileInput.register";
import { MemoDataProvider } from "../MemoDataProvider/MemoDataProvider";

export interface FileInputProps {
  name: string;
  onChange?(files: File[]): void;
  onInvalidFileInput?(files: { fileName: string; reason: string }[]): void;
  types?: (keyof typeof FILE_TYPES | string)[];
  multiple?: boolean;
  maxSize?: number;
  children: ReactNode;
}

export function FileInput({
  name,
  onChange,
  onInvalidFileInput,
  types,
  multiple,
  maxSize,
  children,
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const resolvedTypes = resolveTypes(types);

  function handleFilesChange(e: ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;

    const files = Array.from(fileList);
    const { valid, invalid } = validateFiles(files, resolvedTypes, maxSize);

    if (valid.length) onChange?.(valid);
    if (invalid.length) onInvalidFileInput?.(invalid);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleClick() {
    inputRef.current?.click();
  }

  const accept = getAccept(resolvedTypes);

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

function resolveTypes(types?: (keyof typeof FILE_TYPES | string)[]): string[] {
  return (
    types?.flatMap((type) =>
      type in FILE_TYPES ? FILE_TYPES[type as keyof typeof FILE_TYPES] : [type],
    ) ?? []
  );
}

function getAccept(types: string[]) {
  if (!types.length) return undefined;
  return types.join(",");
}

function validateFiles(files: File[], types: string[], maxSize?: number) {
  const valid: File[] = [];
  const invalid: { fileName: string; reason: string }[] = [];

  for (const file of files) {
    if (!isFileSizeValid(file, maxSize)) {
      invalid.push({ fileName: file.name, reason: "File is too large" });
      continue;
    }
    if (!isFileFormatValid(file, types)) {
      invalid.push({ fileName: file.name, reason: "Unsupported file format" });
      continue;
    }
    valid.push(file);
  }

  return { valid, invalid };
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
