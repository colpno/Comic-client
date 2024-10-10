import { RouteObject } from 'react-router-dom';

import { ROUTE_HOME } from '~/constants/routes';
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
