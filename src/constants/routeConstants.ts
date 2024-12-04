export const ROUTE_HOME = '/' as const;
export const ROUTE_LIBRARY = '/library' as const;
export const ROUTE_GENRES = '/genres' as const;
export const ROUTE_DAILY_COMIC = '/daily' as const;
export const ROUTE_RANKING = '/ranking' as const;

export const getComicRoute = (comicId: string) => `/comics/${comicId}` as const;
export const getComicReadingRoute = (comicId: string, chapterNumber: string | number) =>
  `${getComicRoute(comicId)}/reading/${chapterNumber}` as const;
