export const ROUTE_HOME = '/' as const;
export const ROUTE_LIBRARY = '/library' as const;
export const ROUTE_GENRES = '/genres' as const;
export const ROUTE_DAILY_COMIC = '/daily' as const;
export const ROUTE_RANKING = '/ranking' as const;

export const getComicRoute = (id: string) => `/comics/${id}` as const;
export const getComicReadingRoute = (id: string, chapterNumber: string | number) =>
  `${getComicRoute(id)}/reading/${chapterNumber}` as const;
