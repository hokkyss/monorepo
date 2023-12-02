import type { Route } from '../../configs/route-map/route-map.config';

import { Suspense, lazy } from 'react';

const LoginPage = lazy(() => import('./login.page'));

const loginRoute: Route = {
  element: (
    <Suspense fallback={<h1>Loading...</h1>}>
      <LoginPage />
    </Suspense>
  ),
  index: true,
  name: 'login',
};

export default loginRoute;
