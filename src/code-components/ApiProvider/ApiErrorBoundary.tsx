import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FetchError } from "./FetchError";

export interface ApiErrorBoundaryProps {
  previewFallback?: boolean;
  fallback: ReactNode;
  children: ReactNode;
}

export function ApiErrorBoundary({
  previewFallback = false,
  fallback,
  children,
}: ApiErrorBoundaryProps) {
  if (previewFallback) {
    return fallback;
  }

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        if (!(error instanceof FetchError)) {
          throw error;
        }
        return fallback;
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
