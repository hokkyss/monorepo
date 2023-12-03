import type { ErrorInfo, FunctionComponent, ReactNode } from 'react';

type ErrorBoundaryFallbackProps = {
  error: Error;
  reset: () => void;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
  onError: (error: Error, errorInfo: ErrorInfo) => void;
} & (
  | {
      Fallback: FunctionComponent<ErrorBoundaryFallbackProps>;
      fallback?: never;
    }
  | {
      Fallback?: never;
      fallback: ReactNode;
    }
);
