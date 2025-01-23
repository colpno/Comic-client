import { createBrowserRouter } from 'react-router-dom';

import { SuspenseLayout } from '~/layouts/index.ts';
import { ErrorPage, MaintenancePage } from '~/pages/index.ts';
import protectedRoutes from './protectedRoutes.ts';
import publicRoutes from './publicRoutes.ts';

export const router = createBrowserRouter([
  {
    Component: SuspenseLayout,
    ErrorBoundary: ErrorPage,
    children: [
      {
        Component: MaintenancePage,
        children: [publicRoutes, protectedRoutes],
      },
    ],
  },
]);
