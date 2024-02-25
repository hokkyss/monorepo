import './inject-dependencies';
import './styles.css';

import type { ReactQueryDevtools as TanstackReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ErrorBoundary } from '@monorepo/ui';
import noop from 'lodash/fp/noop';
import { StrictMode, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import envConfig from './configs/env/env.config';
import queryClient from './configs/react-query/react-query.config';
import routeMap from './configs/route-map/route-map.config';
import loginRoute from './pages/login/login.route';
import mainRoute from './pages/main/main.route';
import reportAccessibility from './reports/accessibility/accessibility.report';
import reportWebVitals from './reports/web-vitals/web-vitals.report';
import { resolveRoute } from './utils/router/router.util';

const rootElement = document.getElementById('root');

const router = createBrowserRouter([mainRoute, loginRoute].map((route) => resolveRoute(route, routeMap)));
const ReactQueryDevtools =
  envConfig.env === 'development'
    ? lazy(() => import('@tanstack/react-query-devtools').then((mod) => ({ default: mod.ReactQueryDevtools })))
    : ((() => null) as typeof TanstackReactQueryDevtools);

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <ErrorBoundary fallback="An error happened!" onError={noop}>
        <ReactQueryDevtools client={queryClient} />
        <RouterProvider router={router} />
      </ErrorBoundary>
    </StrictMode>,
  );

  reportAccessibility();
  // NOTE: report web vitals is DEV only
  // eslint-disable-next-line no-console
  reportWebVitals(console.debug);
}
