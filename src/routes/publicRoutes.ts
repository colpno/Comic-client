import { RouteObject } from 'react-router-dom';

import {
  getComicReadingRoute,
  getComicRoute,
  ROUTE_DAILY,
  ROUTE_HOME,
  ROUTE_RANKING,
} from '~/constants/routeConstants';
import { DefaultLayout, HomeLayout, MenuLayout, ReadingLayout } from '~/layouts/index.ts';
import { ComicPage, DailyPage, HomePage, RankingPage, ReadingPage } from '~/pages/index.ts';

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
      ],
    },
  ],
};

export default publicRoutes;
