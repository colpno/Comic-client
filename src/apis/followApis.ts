import {
  ApiAddFollowParams,
  ApiGetFollowsParams,
  ApiGetFollowsReturnType,
  ApiRemoveFollowParams,
} from '~/types/apis/followApiTypes.ts';
import { Comic } from '~/types/comicType.ts';
import { FOLLOW_ENDPOINTS, TAG_FOLLOW } from './apiConstants.ts';
import api from './index.ts';

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    // GET
    getFollows: build.query<ApiGetFollowsReturnType['data'], ApiGetFollowsParams>({
      query: (query) => ({
        url: FOLLOW_ENDPOINTS.GET_FOLLOWS(),
        params: query,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({
                type: TAG_FOLLOW,
                id: typeof item === 'string' ? item : (item as Comic).id,
              })),
              TAG_FOLLOW,
            ]
          : [TAG_FOLLOW],
      transformResponse: (response: ApiGetFollowsReturnType) => response.data,
    }),

    // POST
    addFollow: build.mutation<void, ApiAddFollowParams>({
      query: (params) => ({
        url: FOLLOW_ENDPOINTS.ADD_FOLLOW(),
        method: 'POST',
        data: params,
      }),
      invalidatesTags: [TAG_FOLLOW],
    }),

    // DELETE
    removeFollow: build.mutation<void, ApiRemoveFollowParams>({
      query: ({ id }) => ({
        url: FOLLOW_ENDPOINTS.REMOVE_FOLLOW(id),
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: TAG_FOLLOW, id }],
    }),
  }),
});

export const {
  useAddFollowMutation,
  useGetFollowsQuery,
  useLazyGetFollowsQuery,
  useRemoveFollowMutation,
} = extendedApi;

export type * from '~/types/apis/followApiTypes.ts';
