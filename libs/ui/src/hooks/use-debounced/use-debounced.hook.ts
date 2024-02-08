import { useCallback, useState } from 'react';

import useTimeout from '../use-timeout/use-timeout.hook';

/**
 * Synchronize to the variable value after some time the variable does not change.
 * @param value The value to be synchronized. The timer will be reset everytime this changes.
 * @param milliseconds Synchronize to `value` after some milliseconds.
 */
export default function useDebounced<T>(value: T, milliseconds: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useTimeout(
    useCallback(() => {
      setDebouncedValue(value);
    }, [value]),
    milliseconds,
  );

  return debouncedValue;
}
