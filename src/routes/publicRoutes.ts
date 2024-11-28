import { RouteObject } from 'react-router-dom';

import { getComicRoute, ROUTE_HOME } from '~/constants/routeConstants';
import { DefaultLayout, HomeLayout } from '~/layouts/index.ts';
import { ComicPage, HomePage } from '~/pages/index.ts';

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
    {
      Component: DefaultLayout,
      children: [
        {
          path: getComicRoute(':id'),
          Component: ComicPage,
        },
      ],
    },
  ],
};

export default publicRoutes;
