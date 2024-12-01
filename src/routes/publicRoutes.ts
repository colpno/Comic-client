import { RouteObject } from 'react-router-dom';

import { getComicReadingRoute, getComicRoute, ROUTE_HOME } from '~/constants/routeConstants';
import { DefaultLayout, HomeLayout, ReadingLayout } from '~/layouts/index.ts';
import { ComicPage, HomePage, ReadingPage } from '~/pages/index.ts';

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
    {
      Component: ReadingLayout,
      children: [
        {
          path: getComicReadingRoute(':id', ':chapter'),
          Component: ReadingPage,
        },
      ],
    },
  ],
};

export default publicRoutes;
