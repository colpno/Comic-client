import { RouteObject } from 'react-router-dom';

import { ROUTE_HOME } from '~/constants/routeConstants';
import { HomeLayout } from '~/layouts/index.ts';
import { HomePage } from '~/pages/index.ts';

const publicRoutes: RouteObject = {
  children: [
    {
      Component: HomeLayout,
      children: [
        {
          path: ROUTE_HOME,
          Component: HomePage,
        },
      ],
    },
  ],
};

export default publicRoutes;
