import type { ForwardedRef, RefCallback } from 'react';

import { useMemo } from 'react';

function createMergedRefCallback<T>(refs: (ForwardedRef<T> | RefCallback<T> | undefined)[]): RefCallback<T> {
  return function applyRef(instance) {
    refs.forEach((ref) => {
      if (!ref) {
        return;
      }

      if (typeof ref === 'function') {
        ref(instance);
      } else {
        // NOTE: ref is reassigned through `current`.
        ref.current = instance;
      }
    });
  };
}

export default function useMergeRef<T>(...refs: (ForwardedRef<T> | RefCallback<T> | undefined)[]) {
  return useMemo(() => (refs.every((ref) => !ref) ? null : createMergedRefCallback(refs)), [refs]);
}
