import moment from 'moment';

import {
  getCompletedRoute,
  getDailyRoute,
  getRankingRoute,
  ROUTE_COMPLETED,
  ROUTE_NEW_ARRIVALS,
  ROUTE_RANKING,
} from '~/constants/routeConstants.ts';

export interface SubMenuItem {
  title: string;
  link: string;
}

export const rankingPageCategoryMenu: SubMenuItem[] = [
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

export const dailyPageMenu: SubMenuItem[] = [
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

export const completedPageMenu: SubMenuItem[] = rankingPageCategoryMenu.map((item) => ({
  ...item,
  link: getCompletedRoute(item.link.split('=')[1]),
}));

interface MenuItem {
  title: string;
  link: string;
  headerMenu?: SubMenuItem[];
}

export const menu: MenuItem[] = [
  {
    title: 'New Arrivals',
    link: ROUTE_NEW_ARRIVALS,
  },
  {
    title: 'Daily',
    link: getDailyRoute(moment().format('dddd').toLowerCase()),
    headerMenu: dailyPageMenu,
  },
  {
    title: 'Ranking',
    link: ROUTE_RANKING,
    headerMenu: rankingPageCategoryMenu,
  },
  {
    title: 'Completed',
    link: ROUTE_COMPLETED,
    headerMenu: completedPageMenu,
  },
];
