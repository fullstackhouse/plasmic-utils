import { ChangeEvent, ReactNode, useRef } from "react";
import { FILE_TYPES } from "./FileInput.register";

interface FileUploadProps {
  onChange?(value: File): void;
  types?: string[];
  customTypes?: string[];
  className?: string;
  children: ReactNode;
}

export function FileInput({
  onChange,
  types,
  customTypes,
  className,
  children,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentTypes =
    customTypes ??
    types?.flatMap((key) => FILE_TYPES[key as keyof typeof FILE_TYPES]) ??
    [];

  async function handleFilesChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (currentTypes.length > 0 && !isAcceptedFile(file, currentTypes)) return;

    onChange?.(file);
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

  console.log("normalizedTypes: ", normalizedTypes);
  console.log("mimeType: ", mimeType);
  console.log("fileExt: ", fileExt);

  return normalizedTypes.some(
    (type) =>
      type === fileExt ||
      type === mimeType ||
      (type.endsWith("/*") && mimeType.startsWith(type.split("/")[0] + "/")),
  );
}
