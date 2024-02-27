import { createLazyFileRoute } from '@tanstack/react-router';

import routeMap from '../configs/route/route-map.config';
import LoginPage from '../pages/login/login.page';

export const Route = createLazyFileRoute(routeMap.login)({
  component: LoginPage,
});
