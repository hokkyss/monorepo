import { useEffect, useRef } from 'react';

export default function usePrevious<T>(data: T): T {
  const value = useRef(data);

  useEffect(() => {
    value.current = data;
  }, [data]);

  return value.current;
}
