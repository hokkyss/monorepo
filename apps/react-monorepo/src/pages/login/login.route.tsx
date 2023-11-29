import type { Route } from '../../configs/route-map/route-map.config';

import { Suspense, lazy } from 'react';

const LoginPage = lazy(() => import('./login.page'));

const loginRoute: Route = {
  children: [],
  element: (
    <Suspense fallback={<h1>Loading...</h1>}>
      <LoginPage />
    </Suspense>
  ),
  index: false,
  name: 'login',
};

export default loginRoute;
