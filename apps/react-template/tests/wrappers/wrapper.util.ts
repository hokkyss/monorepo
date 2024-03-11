import type { FunctionComponent, PropsWithChildren, ReactElement } from 'react';

import { Fragment, createElement } from 'react';

export function composeWrapper(...wrappers: FunctionComponent<PropsWithChildren>[]) {
  return function Wrapper(props: PropsWithChildren) {
    if (wrappers.length === 0) {
      return createElement(Fragment, props);
    }

    return wrappers
      .slice()
      .reverse()
      .reduce<ReactElement>((prev, current) => createElement(current, null, prev), createElement(Fragment, props));
  };
}
