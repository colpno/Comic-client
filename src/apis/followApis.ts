import {
  ApiAddFollowParam,
  ApiGetFollowParams,
  ApiGetFollowReturnType,
  ApiGetFollowsParams,
  ApiGetFollowsReturnType,
  ApiRemoveFollowParam,
} from '~/types/apis/followApiTypes.ts';
import { FOLLOW_ENDPOINTS, TAG_FOLLOW } from './apiConstants.ts';
import { attachAuthorization } from './apiUtils.ts';
import api from './index.ts';

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    // GET
    getFollows: build.query<ApiGetFollowsReturnType, ApiGetFollowsParams | void>({
      queryFn: async (args, { getState }, _, query) => {
        const res = await attachAuthorization(
          {
            url: FOLLOW_ENDPOINTS.GET_FOLLOWS(),
            params: args,
          },
          getState,
          query
        );

        if (res.error) {
          return { error: res.error };
        }

        return { data: res.data as ApiGetFollowsReturnType };
      },
      providesTags: (result) =>
        result
          ? [...result.data.map(({ id }) => ({ type: TAG_FOLLOW, id })), TAG_FOLLOW]
          : [TAG_FOLLOW],
    }),
    getFollow: build.query<ApiGetFollowReturnType['data'], ApiGetFollowParams>({
      queryFn: async ({ following, ...args }, { getState }, _, query) => {
        const res = await attachAuthorization(
          {
            url: FOLLOW_ENDPOINTS.GET_FOLLOW(following),
            params: args,
          },
          getState,
          query
        );

        if (res.error) {
          return { error: res.error };
        }

        return { data: res.data.data as ApiGetFollowReturnType['data'] };
      },
      providesTags: (result) => {
        if (!result) return [TAG_FOLLOW];
        return [{ type: TAG_FOLLOW, id: result.id }, TAG_FOLLOW];
      },
    }),

    // POST
    addFollow: build.mutation<void, ApiAddFollowParam>({
      queryFn: async (followingId, { getState }, _, query) => {
        const res = await attachAuthorization(
          {
            url: FOLLOW_ENDPOINTS.ADD_FOLLOW(),
            method: 'POST',
            data: {
              followingId,
            },
          },
          getState,
          query
        );

        if (res.error) {
          return { error: res.error };
        }

        return { data: undefined as void };
      },
      invalidatesTags: [TAG_FOLLOW],
    }),

    // DELETE
    removeFollow: build.mutation<void, ApiRemoveFollowParam>({
      queryFn: async (id, { getState }, _, query) => {
        const res = await attachAuthorization(
          {
            url: FOLLOW_ENDPOINTS.REMOVE_FOLLOW(id),
            method: 'DELETE',
          },
          getState,
          query
        );

        if (res.error) {
          return { error: res.error };
        }

        return { data: undefined as void };
      },
      invalidatesTags: (_result, _error, id) => [{ type: TAG_FOLLOW, id }, TAG_FOLLOW],
    }),
  }),
});

export const {
  useAddFollowMutation,
  useGetFollowsQuery,
  useLazyGetFollowsQuery,
  useRemoveFollowMutation,
  useGetFollowQuery,
  useLazyGetFollowQuery,
} = extendedApi;

export type * from '~/types/apis/followApiTypes.ts';
