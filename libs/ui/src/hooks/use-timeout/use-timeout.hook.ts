import { useEffect } from 'react';

/**
 * @example
 * ```ts
 * useTimeout(
 *   useCallback(() => {
 *     // executed after 500ms
 *   }, []),
 *   500,
 * );
 * ```
 * @param callback Callback to be executed after `milliseconds` milliseconds. To prevent unnecessary rerenders, `callback` must be stable (declared outside component/hooks or wrapped in `useCallback`).
 * @param milliseconds
 * @param args The arguments to be passed to callback
 */
export default function useTimeout<Args extends unknown[]>(
  callback: (...args: Args) => void,
  milliseconds: number,
  ...args: Args
) {
  useEffect(() => {
    const timeout = setTimeout<Args>(callback, milliseconds, ...args);

    return () => clearTimeout(timeout);
  }, [args, callback, milliseconds]);
}
