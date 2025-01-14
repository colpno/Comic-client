import {
  ApiAddFollowParam,
  ApiGetFollowParams,
  ApiGetFollowReturnType,
  ApiRemoveFollowParam,
} from '~/types/apis/followApiTypes.ts';
import { FOLLOW_ENDPOINTS, TAG_FOLLOW } from './apiConstants.ts';
import api from './index.ts';

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    // GET
    getFollows: build.query<ApiGetFollowReturnType['data'], ApiGetFollowParams | void>({
      query: (query) => ({
        url: FOLLOW_ENDPOINTS.GET_FOLLOWS(),
        params: query,
      }),
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: TAG_FOLLOW, id })), TAG_FOLLOW] : [TAG_FOLLOW],
      transformResponse: (response: ApiGetFollowReturnType) => response.data,
    }),

    // POST
    addFollow: build.mutation<void, ApiAddFollowParam>({
      query: (followingId) => ({
        url: FOLLOW_ENDPOINTS.ADD_FOLLOW(),
        method: 'POST',
        data: {
          followingId,
        },
      }),
      invalidatesTags: [TAG_FOLLOW],
    }),

    // DELETE
    removeFollow: build.mutation<void, ApiRemoveFollowParam>({
      query: (id) => ({
        url: FOLLOW_ENDPOINTS.REMOVE_FOLLOW(id),
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: TAG_FOLLOW, id }],
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
