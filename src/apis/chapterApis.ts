import {
  ApiGetChaptersParams,
  ApiGetChaptersReturnType,
  ApiGetContentReturnType,
  ApiReadingChapterParams,
  ApiReadingChapterReturnType,
  Chapter,
} from '~/types/index.ts';
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
    readingChapter: build.query<ApiReadingChapterReturnType, ApiReadingChapterParams>({
      query: ({ title, chapterNumber }) => ({
        url: CHAPTER_ENDPOINTS.READING_CHAPTER(title, chapterNumber),
      }),
    }),
  }),
});

export const {
  useGetChaptersQuery,
  useGetContentQuery,
  useLazyGetChaptersQuery,
  useLazyGetContentQuery,
  useReadingChapterQuery,
  useLazyReadingChapterQuery,
} = extendedApi;
