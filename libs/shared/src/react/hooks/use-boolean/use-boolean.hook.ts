import type { Dispatch, SetStateAction } from 'react';

import { useCallback, useState } from 'react';

type Toggle = [
  boolean,
  {
    off: () => void;
    on: () => void;
    set: Dispatch<SetStateAction<boolean>>;
    toggle: () => void;
  },
];

export default function useToggle(initialState = false): Toggle {
  const [value, setValue] = useState(initialState);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);

  return [value, { off, on, set: setValue, toggle }];
}
