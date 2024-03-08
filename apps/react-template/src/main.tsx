import './styles.css';

import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { routeTree } from './configs/route/route.config';
import reportAccessibility from './reports/accessibility/accessibility.report';
import reportWebVitals from './reports/web-vitals/web-vitals.report';

const rootElement = document.getElementById('root');

const router = createRouter({ routeTree });

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );

  reportAccessibility();
  // NOTE: report web vitals is DEV only
  // eslint-disable-next-line no-console
  reportWebVitals(console.debug);
}
