import moment from 'moment';

import {
  getDailyRoute,
  getRankingRoute,
  ROUTE_NEW_ARRIVALS,
  ROUTE_RANKING,
} from '~/constants/routeConstants.ts';

export interface PageMenuItem {
  title: string;
  link: string;
}

export const categoryMenu: PageMenuItem[] = [
  {
    title: 'All',
    link: getRankingRoute(),
  },
  {
    title: 'Action',
    link: getRankingRoute('action'),
  },
  {
    title: 'Adventure',
    link: getRankingRoute('adventure'),
  },
  {
    title: 'Comedy',
    link: getRankingRoute('comedy'),
  },
  {
    title: 'Drama',
    link: getRankingRoute('drama'),
  },
  {
    title: 'Fantasy',
    link: getRankingRoute('fantasy'),
  },
  {
    title: 'Horror',
    link: getRankingRoute('horror'),
  },
  {
    title: 'Romance',
    link: getRankingRoute('romance'),
  },
  {
    title: 'Sci-fi',
    link: getRankingRoute('sci-fi'),
  },
  {
    title: 'Slice of Life',
    link: getRankingRoute('slice-of-life'),
  },
  {
    title: 'Supernatural',
    link: getRankingRoute('supernatural'),
  },
];
export const dailyMenu: PageMenuItem[] = [
  {
    title: 'Monday',
    link: getDailyRoute('monday'),
  },
  {
    title: 'Tuesday',
    link: getDailyRoute('tuesday'),
  },
  {
    title: 'Wednesday',
    link: getDailyRoute('wednesday'),
  },
  {
    title: 'Thursday',
    link: getDailyRoute('thursday'),
  },
  {
    title: 'Friday',
    link: getDailyRoute('friday'),
  },
  {
    title: 'Saturday',
    link: getDailyRoute('saturday'),
  },
  {
    title: 'Sunday',
    link: getDailyRoute('sunday'),
  },
];

export const menu = [
  {
    title: 'New Arrivals',
    link: ROUTE_NEW_ARRIVALS,
  },
  {
    title: 'Daily',
    link: getDailyRoute(moment().format('dddd').toLowerCase()),
    headerMenu: dailyMenu,
  },
  {
    title: 'Ranking',
    link: ROUTE_RANKING,
    headerMenu: categoryMenu,
  },
];
