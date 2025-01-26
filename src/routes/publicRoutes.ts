import { RouteObject } from 'react-router-dom';

import {
  getComicReadingRoute,
  getComicRoute,
  getComicsByGenreRoute,
  ROUTE_COMPLETED,
  ROUTE_HOME,
  ROUTE_LATEST_UPDATES,
  ROUTE_LOGIN,
  ROUTE_NEW_ARRIVALS,
  ROUTE_RANKING,
  ROUTE_SEARCH,
  ROUTE_SIGNUP,
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
  ComicsByGenrePage,
  CompletedPage,
  HomePage,
  LatestUpdatesPage,
  LoginPage,
  NewProductsPage,
  RankingPage,
  ReadingPage,
  SearchPage,
  SignUpPage,
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
          path: getComicRoute(':comictitle'),
          Component: ComicPage,
        },
        {
          path: ROUTE_LOGIN,
          Component: LoginPage,
        },
        {
          path: getComicsByGenreRoute(':genre'),
          Component: ComicsByGenrePage,
        },
        {
          path: ROUTE_SIGNUP,
          Component: SignUpPage,
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
          path: getComicReadingRoute(':comicTitle', ':chapterNumber'),
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
          path: ROUTE_LATEST_UPDATES,
          Component: LatestUpdatesPage,
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
