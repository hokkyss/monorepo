import { createLazyFileRoute } from '@tanstack/react-router';

import routeMap from '../configs/route/route-map.config';
import MainPage from '../pages/main/main.page';

export const Route = createLazyFileRoute(routeMap.main)({
  component: MainPage,
});
