import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { Suspense, lazy } from 'react';

import envConfig from '../configs/env/env.config';
import queryClient from '../configs/react-query/react-query.config';

const ReactQueryDevtools =
  envConfig.env === 'development'
    ? lazy(() => import('@tanstack/react-query-devtools').then((mod) => ({ default: mod.ReactQueryDevtools })))
    : () => null;

const TanStackRouterDevtools =
  envConfig.env === 'development'
    ? lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      )
    : () => null;

export const Route = createRootRouteWithContext()({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </Suspense>
    </QueryClientProvider>
  ),
  wrapInSuspense: true,
});
