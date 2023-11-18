import type { ForwardedRef, RefCallback } from 'react';

import { useCallback, useMemo } from 'react';

export default function useMergeRef<T>(...refs: (ForwardedRef<T> | RefCallback<T> | undefined)[]) {
  const applyRef = useCallback<RefCallback<T>>(
    (instance: T | null) => {
      refs.forEach((ref) => {
        if (!ref) {
          return;
        }

        if (typeof ref === 'function') {
          ref(instance);
        } else {
          // NOTE: ref is reassigned through `current`.
          // eslint-disable-next-line no-param-reassign
          ref.current = instance;
        }
      });
    },
    [refs],
  );

  const mergedRef = useMemo(() => (refs.every((ref) => !ref) ? null : applyRef), [applyRef, refs]);

  return mergedRef;
}
