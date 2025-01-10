import {
  ApiAddFollowParams,
  ApiGetFollowsParams,
  ApiGetFollowsReturnType,
  ApiRemoveFollowParams,
} from '~/types/apis/followApiTypes.ts';
import { FOLLOW_ENDPOINTS } from './apiConstants.ts';
import api from './index.ts';

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    // GET
    getFollows: build.query<ApiGetFollowsReturnType['data'], ApiGetFollowsParams>({
      query: (query) => ({
        url: FOLLOW_ENDPOINTS.GET_FOLLOWS(),
        params: query,
      }),
      transformResponse: (response: ApiGetFollowsReturnType) => response.data,
    }),

    // POST
    addFollow: build.mutation<void, ApiAddFollowParams>({
      query: (params) => ({
        url: FOLLOW_ENDPOINTS.ADD_FOLLOW(),
        method: 'POST',
        data: params,
      }),
    }),

    // DELETE
    removeFollow: build.mutation<void, ApiRemoveFollowParams>({
      query: ({ id }) => ({
        url: FOLLOW_ENDPOINTS.REMOVE_FOLLOW(id),
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddFollowMutation,
  useGetFollowsQuery,
  useLazyGetFollowsQuery,
  useRemoveFollowMutation,
} = extendedApi;
