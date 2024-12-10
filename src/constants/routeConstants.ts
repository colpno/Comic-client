export const ROUTE_HOME = '/' as const;
export const ROUTE_LIBRARY = '/library' as const;
export const ROUTE_GENRES = '/genres' as const;
export const ROUTE_DAILY = '/daily' as const;
export const ROUTE_RANKING = '/ranking' as const;
export const ROUTE_NEW_ARRIVALS = '/news' as const;

export const getComicRoute = (comicId: string) => `/comics/${comicId}`;

export const getComicReadingRoute = (comicId: string, chapterNumber: string | number) =>
  `${getComicRoute(comicId)}/reading/${chapterNumber}`;

export const getRankingRoute = (category?: string) => {
  if (!category) return ROUTE_RANKING;
  return `${ROUTE_RANKING}?category=${category}`;
};

export const getDailyRoute = (weekDay?: string) => {
  if (!weekDay) return ROUTE_DAILY;
  return `${ROUTE_DAILY}?weekday=${weekDay}`;
};
