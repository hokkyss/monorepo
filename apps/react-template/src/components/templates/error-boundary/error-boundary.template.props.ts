import type { ErrorInfo, FunctionComponent, ReactNode } from 'react';

type ErrorBoundaryFallbackProps = {
  /**
   * The thrown error
   */
  error: Error;
  /**
   * Reset the error
   */
  reset: () => void;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
} & (
  | {
      /**
       * The component to be rendered when error happened
       */
      Fallback: FunctionComponent<ErrorBoundaryFallbackProps>;
      /**
       * The component to be rendered when error happened
       */
      fallback?: never;
    }
  | {
      Fallback?: never;
      fallback: ReactNode;
    }
);
