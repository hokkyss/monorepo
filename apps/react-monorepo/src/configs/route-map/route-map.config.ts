import type { Except } from '@monorepo/shared/types';
import type { RouteObject } from 'react-router-dom';

import type { RouteName } from '../locale/locale.config';

const routeMap = Object.freeze({
  login: '/login',
  main: '/',
} satisfies Record<RouteName, string>);

export type Route = Except<RouteObject, 'children' | 'index' | 'path'> & {
  name: RouteName;
} & (
    | {
        children: Route[];
        index: false;
      }
    | {
        children?: never;
        index: true;
      }
  );

export default routeMap;
