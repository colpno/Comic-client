const BOOKSHELF = '/bookshelf' as const;
const PASSWORD = '/password' as const;

export const ROUTE_HOME = '/' as const;
export const ROUTE_HISTORY = `${BOOKSHELF}/history` as const;
export const ROUTE_GENRES = '/genres' as const;
export const ROUTE_LATEST_UPDATES = '/latest-updates' as const;
export const ROUTE_RANKING = '/ranking' as const;
export const ROUTE_NEW_ARRIVALS = '/news' as const;
export const ROUTE_COMPLETED = '/completed' as const;
export const ROUTE_SEARCH = '/search' as const;
export const ROUTE_LOGIN = '/login' as const;
export const ROUTE_FOLLOW = `${BOOKSHELF}/follow` as const;
export const ROUTE_SIGNUP = '/signup' as const;
export const ROUTE_RESET_PASSWORD = `${PASSWORD}/reset` as const;
export const ROUTE_FORGOT_PASSWORD = `${PASSWORD}/forgot` as const;

export const PROTECTED_ROUTES = [ROUTE_HISTORY, ROUTE_FOLLOW, ROUTE_RESET_PASSWORD] as string[];

/**
 * @param comicTitle title will be converted to lowercase and replace space with '-'.
 */
export const getComicRoute = (comicTitle?: string) => {
  if (!comicTitle) return '';
  const title = comicTitle.toLowerCase().replace(/ /g, '-');
  return `/comics/${title}`;
};

/**
 * @param comicTitle title will be converted to lowercase and replace space with '-'.
 * @param chapterNumber >= 0 to get the reading route.
 * @returns either empty string or the reading route.
 */
export const getComicReadingRoute = (comicTitle?: string, chapterNumber?: string) => {
  if (!comicTitle || !chapterNumber) return '';
  return `${getComicRoute(comicTitle)}/reading/${chapterNumber}`;
};

export const getRankingRoute = (category?: string) => {
  if (!category) return ROUTE_RANKING;
  return `${ROUTE_RANKING}?category=${category}`;
};

export const getLatestUpdatesRoute = (weekDay?: string) => {
  if (!weekDay) return ROUTE_LATEST_UPDATES;
  return `${ROUTE_LATEST_UPDATES}?weekday=${weekDay}`;
};

export const getCompletedRoute = (category?: string) => {
  if (!category) return ROUTE_COMPLETED;
  return `${ROUTE_COMPLETED}?category=${category}`;
};

export const getSearchRoute = (searchValue?: string) => {
  if (!searchValue) return ROUTE_SEARCH;
  return `${ROUTE_SEARCH}?value=${searchValue}`;
};

export const getComicsByGenreRoute = (genre?: string) => {
  if (!genre) return '';
  const genreURL = genre.toLowerCase().replace(/ /g, '-');
  return `${ROUTE_GENRES}/${genreURL}`;
};
