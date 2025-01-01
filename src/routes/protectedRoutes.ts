import { RouteObject } from 'react-router-dom';

import { ROUTE_FOLLOW, ROUTE_HISTORY } from '~/constants/routeConstants';
import { BookshelfLayout, ProtectedLayout } from '~/layouts/index.ts';
import { FollowPage, HistoryPage } from '~/pages/index.ts';

const protectedRoutes: RouteObject = {
  Component: ProtectedLayout,
  children: [
    {
      Component: BookshelfLayout,
      children: [
        {
          path: ROUTE_HISTORY,
          Component: HistoryPage,
        },
        {
          path: ROUTE_FOLLOW,
          Component: FollowPage,
        },
      ],
    },
  ],
};

export default protectedRoutes;
