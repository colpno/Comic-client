import { RouteObject } from 'react-router-dom';

import {
  getComicReadingRoute,
  getComicRoute,
  ROUTE_COMPLETED,
  ROUTE_DAILY,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_NEW_ARRIVALS,
  ROUTE_RANKING,
  ROUTE_SEARCH,
} from '~/constants/routeConstants';
import {
  BasicLayout,
  HomeLayout,
  MenuLayout,
  ReadingLayout,
  SearchLayout,
} from '~/layouts/index.ts';
import {
  ComicPage,
  CompletedPage,
  DailyPage,
  HomePage,
  LoginPage,
  NewProductsPage,
  RankingPage,
  ReadingPage,
  SearchPage,
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
      Component: BasicLayout,
      children: [
        {
          path: getComicRoute(':comicId'),
          Component: ComicPage,
        },
        {
          path: ROUTE_LOGIN,
          Component: LoginPage,
        },
      ],
    },
    {
      Component: SearchLayout,
      children: [
        {
          path: ROUTE_SEARCH,
          Component: SearchPage,
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
        {
          path: ROUTE_COMPLETED,
          Component: CompletedPage,
        },
      ],
    },
  ],
};

export default publicRoutes;
