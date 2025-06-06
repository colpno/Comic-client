import {
  ApiGetComicParams,
  ApiGetComicReturnType,
  ApiGetComicsParams,
  ApiGetComicsReturnType,
} from '~/types/apis/comicApiTypes.ts';
import { COMIC_ENDPOINTS } from './apiConstants.ts';
import api from './index.ts';

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    // GET
    getComics: build.query<ApiGetComicsReturnType, ApiGetComicsParams>({
      query: (query) => ({
        url: COMIC_ENDPOINTS.GET_COMICS(),
        params: query,
      }),
    }),
    getComic: build.query<ApiGetComicReturnType['data'], ApiGetComicParams>({
      query: ({ title, ...query }) => ({
        url: COMIC_ENDPOINTS.GET_COMIC(title),
        params: query,
      }),
      transformResponse: (response: ApiGetComicReturnType) => response.data,
    }),
  }),
});

export const { useGetComicQuery, useGetComicsQuery, useLazyGetComicQuery, useLazyGetComicsQuery } =
  extendedApi;
