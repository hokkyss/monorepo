import { useEffect, useRef } from 'react';

/**
 * Get the previous value of a variable
 *
 * @param value The variable you want to get the previous value of
 * @returns The previous value of the variable
 */
export default function usePrevious<T>(data: T): T {
  const value = useRef(data);

  useEffect(() => {
    value.current = data;
  }, [data]);

  return value.current;
}
