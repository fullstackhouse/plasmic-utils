import { ChangeEvent, ReactNode, useRef } from "react";
import { FILE_TYPES } from "./FileInput.register";

interface FileUploadProps {
  onChange?(files: File[]): void;
  types?: string[];
  customTypes?: string[];
  multiple?: boolean;
  className?: string;
  children: ReactNode;
}

export function FileInput({
  onChange,
  types,
  customTypes,
  multiple,
  className,
  children,
}: FileUploadProps) {
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
      isAcceptedFile(file, currentTypes),
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

function isAcceptedFile(file: File, types: string[]): boolean {
  const normalizedTypes = types.map((t) => t.trim().toLowerCase());
  const mimeType = file.type.toLowerCase();
  const fileExt = "." + file.name.split(".").pop()?.toLowerCase();

  return normalizedTypes.some(
    (type) =>
      type === fileExt ||
      type === mimeType ||
      (type.endsWith("/*") && mimeType.startsWith(type.split("/")[0] + "/")),
  );
}
