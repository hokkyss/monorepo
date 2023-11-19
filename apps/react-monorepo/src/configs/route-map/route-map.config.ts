import type { Except } from '@monorepo/shared';
import type { RouteObject } from 'react-router-dom';

const routeMap = Object.freeze({
  main: '/',
});

export type RouteName = keyof typeof routeMap;

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
