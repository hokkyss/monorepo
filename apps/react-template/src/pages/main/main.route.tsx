import type { Route } from '../../configs/route-map/route-map.config';

import { Suspense, lazy } from 'react';

const MainPage = lazy(() => import('./main.page'));

const mainRoute: Route = {
  element: (
    <Suspense fallback={<h1>Loading...</h1>}>
      <MainPage />
    </Suspense>
  ),
  index: true,
  name: 'main',
};

export default mainRoute;
