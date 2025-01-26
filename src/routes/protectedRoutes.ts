import { RouteObject } from 'react-router-dom';

import { ROUTE_FOLLOW, ROUTE_HISTORY, ROUTE_RESET_PASSWORD } from '~/constants/routeConstants';
import { BasicLayout, BookshelfLayout, ProtectedLayout } from '~/layouts/index.ts';
import { FollowPage, HistoryPage, ResetPasswordPage } from '~/pages/index.ts';

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
    {
      Component: BasicLayout,
      children: [
        {
          path: ROUTE_RESET_PASSWORD,
          Component: ResetPasswordPage,
        },
      ],
    },
  ],
};

export default protectedRoutes;
