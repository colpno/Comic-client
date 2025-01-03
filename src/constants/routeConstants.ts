const BOOKSHELF = '/bookshelf' as const;

export const ROUTE_HOME = '/' as const;
export const ROUTE_HISTORY = `${BOOKSHELF}/history` as const;
export const ROUTE_GENRES = '/genres' as const;
export const ROUTE_DAILY = '/daily' as const;
export const ROUTE_RANKING = '/ranking' as const;
export const ROUTE_NEW_ARRIVALS = '/news' as const;
export const ROUTE_COMPLETED = '/completed' as const;
export const ROUTE_SEARCH = '/search' as const;
export const ROUTE_LOGIN = '/login' as const;
export const ROUTE_FOLLOW = `${BOOKSHELF}/follow` as const;

/**
 * @param comicTitle title will be converted to lowercase and replace space with '-'
 */
export const getComicRoute = (comicTitle: string) => {
  const title = comicTitle.toLowerCase().replace(/ /g, '-');
  return `/comics/${title}`;
};

/**
 * @param chapterNumber >= 0 to get the reading route
 * @returns either empty string or the reading route
 */
export const getComicReadingRoute = (comicTitle: string, chapterNumber: string | number) => {
  if (typeof chapterNumber === 'number' && chapterNumber < 0) return '';
  return `${getComicRoute(comicTitle)}/reading/${chapterNumber}`;
};

export const getRankingRoute = (category?: string) => {
  if (!category) return ROUTE_RANKING;
  return `${ROUTE_RANKING}?category=${category}`;
};

export const getDailyRoute = (weekDay?: string) => {
  if (!weekDay) return ROUTE_DAILY;
  return `${ROUTE_DAILY}?weekday=${weekDay}`;
};

export const getCompletedRoute = (category?: string) => {
  if (!category) return ROUTE_COMPLETED;
  return `${ROUTE_COMPLETED}?category=${category}`;
};

export const getSearchRoute = (searchValue?: string) => {
  if (!searchValue) return ROUTE_SEARCH;
  return `${ROUTE_SEARCH}?value=${searchValue}`;
};
