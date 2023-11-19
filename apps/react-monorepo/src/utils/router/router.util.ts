import type { RouteObject } from 'react-router-dom';

import type { Route } from '../../configs/route-map/route-map.config';

export function resolveRoute(route: Route, routeMap: Record<string, string>): RouteObject {
  const { name, ...rest } = route;
  if (!(name in routeMap)) {
    throw new Error(`Route ${name} not registered in routeMap`);
  }

  if (rest.index) {
    return {
      ...rest,
      path: routeMap[name],
    };
  }

  return {
    ...rest,
    children: rest.children.map((child) => resolveRoute(child, routeMap)),
    path: routeMap[name],
  };
}

export {};
