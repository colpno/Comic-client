import {
  ApiGetChaptersParams,
  ApiGetChaptersReturnType,
  ApiGetContentReturnType,
} from '~/types/apis/chapterApiTypes.ts';
import { Chapter } from '~/types/chapterType.ts';
import { CHAPTER_ENDPOINTS } from './apiConstants.ts';
import api from './index.ts';

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    // GET
    getContent: build.query<ApiGetContentReturnType['data'], Chapter['id']>({
      query: (id) => ({
        url: CHAPTER_ENDPOINTS.GET_CONTENT(id),
      }),
      transformResponse: (response: ApiGetContentReturnType) => response.data,
    }),
    getChapters: build.query<ApiGetChaptersReturnType, ApiGetChaptersParams>({
      query: ({ comicId, ...query }) => ({
        url: CHAPTER_ENDPOINTS.GET_CHAPTERS(comicId),
        params: query,
      }),
    }),
  }),
});

export const {
  useGetChaptersQuery,
  useGetContentQuery,
  useLazyGetChaptersQuery,
  useLazyGetContentQuery,
} = extendedApi;

export type * from '~/types/apis/chapterApiTypes.ts';
