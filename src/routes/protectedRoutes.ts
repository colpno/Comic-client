import { RouteObject } from 'react-router-dom';

import { ROUTE_HISTORY } from '~/constants/routeConstants';
import { BasicLayout, ProtectedLayout } from '~/layouts/index.ts';
import { HistoryPage } from '~/pages/index.ts';

const protectedRoutes: RouteObject = {
  Component: ProtectedLayout,
  children: [
    {
      Component: BasicLayout,
      children: [
        {
          path: ROUTE_HISTORY,
          Component: HistoryPage,
        },
      ],
    },
  ],
};

export default protectedRoutes;
