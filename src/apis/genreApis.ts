import { ApiGetGenresReturnType } from '~/types/apis/genreApiTypes.ts';
import { GENRE_ENDPOINTS } from './apiConstants.ts';
import api from './index.ts';

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    // GET
    getGenres: build.query<ApiGetGenresReturnType['data'], void>({
      query: (query) => ({
        url: GENRE_ENDPOINTS.GET_GENRES(),
        params: query,
      }),
      transformResponse: (response: ApiGetGenresReturnType) => response.data,
    }),
  }),
});

export const { useGetGenresQuery, useLazyGetGenresQuery } = extendedApi;
