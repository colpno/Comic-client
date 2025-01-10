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
    getComics: build.query<ApiGetComicsReturnType['data'], ApiGetComicsParams>({
      query: (query) => ({
        url: COMIC_ENDPOINTS.GET_COMICS(),
        params: query,
      }),
      transformResponse: (response: ApiGetComicsReturnType) => {
        return response.data;
      },
    }),
    getComic: build.query<ApiGetComicReturnType['data'], ApiGetComicParams>({
      query: ({ id, ...query }) => ({
        url: COMIC_ENDPOINTS.GET_COMIC(id),
        params: query,
      }),
      transformResponse: (response: ApiGetComicReturnType) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetComicQuery, useGetComicsQuery, useLazyGetComicQuery, useLazyGetComicsQuery } =
  extendedApi;
