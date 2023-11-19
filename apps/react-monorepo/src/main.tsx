import './styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import routeMap from './configs/route-map/route-map.config';
import mainRoute from './pages/main/main.route';
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
}
