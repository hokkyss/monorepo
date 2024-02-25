import type { ReferenceType, UseFloatingOptions } from '@floating-ui/react';

import { devtools } from '@floating-ui/devtools';
import { useFloating as useNativeFloating } from '@floating-ui/react';

export default function useFloating<RT extends ReferenceType = ReferenceType>(
  options?: Partial<UseFloatingOptions<ReferenceType>>,
) {
  return useNativeFloating<RT>({
    ...options,
    middleware: [...(options?.middleware ?? []), import.meta.env.DEV && devtools()],
  });
}
