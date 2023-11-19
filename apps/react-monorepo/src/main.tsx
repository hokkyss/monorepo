import 'reflect-metadata';
import './inject-dependencies';
import './styles.css';

import noop from 'lodash/fp/noop';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import routeMap from './configs/route-map/route-map.config';
import mainRoute from './pages/main/main.route';
import reportAccessibility from './reports/accessibility/accessibility.report';
import reportWebVitals from './reports/web-vitals/web-vitals.report';
import { resolveRoute } from './utils/router/router.util';

const rootElement = document.getElementById('root');

const router = createBrowserRouter([mainRoute].map((route) => resolveRoute(route, routeMap)));

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );

  reportAccessibility();
  // NOTE: printing into console is DEV only
  // eslint-disable-next-line no-console
  reportWebVitals(__DEV__ ? console.debug : noop);
}
