export const TAG_FOLLOW = 'Follow' as const;

export const AUTH_ENDPOINTS = {
  BASE: '/auth' as const,
  GET_CSRF: () => `${AUTH_ENDPOINTS.BASE}/csrf-token` as const,
  REFRESH_CSRF: () => `${AUTH_ENDPOINTS.BASE}/refresh-csrf` as const,
  LOGIN: () => `${AUTH_ENDPOINTS.BASE}/login` as const,
  LOGOUT: () => `${AUTH_ENDPOINTS.BASE}/logout` as const,
  REGISTER: () => `${AUTH_ENDPOINTS.BASE}/register` as const,
  RESET_PASSWORD: () => `${AUTH_ENDPOINTS.BASE}/reset-password` as const,
  REFRESH_ACCESS_TOKEN: () => `${AUTH_ENDPOINTS.BASE}/refresh-token` as const,
};

export const COMIC_ENDPOINTS = {
  BASE: '/comics' as const,
  GET_COMICS: () => COMIC_ENDPOINTS.BASE,
  GET_COMIC: (title: string) => `${COMIC_ENDPOINTS.BASE}/${title}` as const,
  SEARCH_COMICS: () => `${COMIC_ENDPOINTS.BASE}/search` as const,
};

export const CHAPTER_ENDPOINTS = {
  BASE: '/chapters' as const,
  GET_CONTENT: (id: string) => `${CHAPTER_ENDPOINTS.BASE}/${id}/content` as const,
  GET_CHAPTERS: (comicId: string) => `${COMIC_ENDPOINTS.BASE}/${comicId}/chapters` as const,
  READING_CHAPTER: (title: string, chapterNumber: string) =>
    `${COMIC_ENDPOINTS.BASE}/${title}/reading/${chapterNumber}` as const,
};

export const FOLLOW_ENDPOINTS = {
  BASE: '/follows' as const,
  GET_FOLLOWS: () => FOLLOW_ENDPOINTS.BASE,
  GET_FOLLOW: (followingId: string) => `${FOLLOW_ENDPOINTS.BASE}/${followingId}` as const,
  ADD_FOLLOW: () => FOLLOW_ENDPOINTS.BASE,
  REMOVE_FOLLOW: (followingId: string) => `${FOLLOW_ENDPOINTS.BASE}/${followingId}` as const,
};

export const GENRE_ENDPOINTS = {
  BASE: '/genres' as const,
  GET_GENRES: () => GENRE_ENDPOINTS.BASE,
};
