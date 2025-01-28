import { RouteObject } from 'react-router-dom';

import { ROUTE_FOLLOW, ROUTE_HISTORY, ROUTE_PROFILE } from '~/constants/routeConstants';
import { BookshelfLayout, ProtectedLayout, UserBasicLayout } from '~/layouts/index.ts';
import { FollowPage, HistoryPage, ProfilePage } from '~/pages/index.ts';

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
      Component: UserBasicLayout,
      children: [
        {
          path: ROUTE_PROFILE,
          Component: ProfilePage,
        },
      ],
    },
  ],
};

export default protectedRoutes;
