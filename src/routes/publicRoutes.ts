import { RouteObject } from 'react-router-dom';

import {
  getComicReadingRoute,
  getComicRoute,
  ROUTE_DAILY,
  ROUTE_HOME,
  ROUTE_NEW_ARRIVALS,
  ROUTE_RANKING,
} from '~/constants/routeConstants';
import { DefaultLayout, HomeLayout, MenuLayout, ReadingLayout } from '~/layouts/index.ts';
import {
  ComicPage,
  DailyPage,
  HomePage,
  NewProductsPage,
  RankingPage,
  ReadingPage,
} from '~/pages/index.ts';

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
          path: getComicRoute(':comicId'),
          Component: ComicPage,
        },
      ],
    },
    {
      Component: ReadingLayout,
      children: [
        {
          path: getComicReadingRoute(':comicId', ':chapterNumber'),
          Component: ReadingPage,
        },
      ],
    },
    {
      Component: MenuLayout,
      children: [
        {
          path: ROUTE_RANKING,
          Component: RankingPage,
        },
        {
          path: ROUTE_DAILY,
          Component: DailyPage,
        },
        {
          path: ROUTE_NEW_ARRIVALS,
          Component: NewProductsPage,
        },
      ],
    },
  ],
};

export default publicRoutes;
