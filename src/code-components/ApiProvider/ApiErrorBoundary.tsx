import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FetchError } from "./FetchError";

export interface ApiErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

export function ApiErrorBoundary({
  fallback,
  children,
}: ApiErrorBoundaryProps) {
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
