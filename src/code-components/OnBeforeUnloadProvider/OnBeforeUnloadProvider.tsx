import { useEffect } from "react";

interface OnBeforeUnloadProviderProps {
  hasUnsavedChanges?: boolean;
}

export function OnBeforeUnloadProvider({
  hasUnsavedChanges = false,
}: OnBeforeUnloadProviderProps) {
  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message =
        "You have unsaved changes. Are you sure you want to leave?";
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return null;
}
