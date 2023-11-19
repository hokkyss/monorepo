import type { Route } from '../../configs/route-map/route-map.config';

import { Suspense, lazy } from 'react';

const MainPage = lazy(() => import('./main.page'));

const mainRoute: Route = {
  children: [],
  element: (
    <Suspense fallback={<h1>Loading...</h1>}>
      <MainPage />
    </Suspense>
  ),
  index: false,
  name: 'main',
};

export default mainRoute;
