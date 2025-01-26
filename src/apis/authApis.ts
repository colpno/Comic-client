import {
  ApiGetCSRFReturnType,
  ApiLoginParams,
  ApiLoginReturnType,
  ApiRefreshAccessToken,
  ApiRegisterParams,
} from '~/types/apis/authApiTypes.ts';
import { AUTH_ENDPOINTS } from './apiConstants.ts';
import { attachAuthorization } from './apiUtils.ts';
import api from './index.ts';

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    // GET
    getCSRF: build.query<ApiGetCSRFReturnType['data'], void>({
      query: () => ({
        url: AUTH_ENDPOINTS.GET_CSRF(),
      }),
      transformResponse: (response: ApiGetCSRFReturnType) => response.data,
    }),
    refreshCSRF: build.query<void, void>({
      query: () => ({
        url: AUTH_ENDPOINTS.REFRESH_CSRF(),
      }),
    }),
    logout: build.query<void, void>({
      queryFn: async (_args, { getState }, _, query) => {
        const res = await attachAuthorization(
          {
            url: AUTH_ENDPOINTS.LOGOUT(),
          },
          getState,
          query
        );

        if (res.error) {
          return { error: res.error };
        }

        return { data: undefined as void };
      },
    }),
    refreshAccessToken: build.query<ApiRefreshAccessToken['data'] | undefined, void>({
      queryFn: async (_args, { getState }, _, query) => {
        const res = await attachAuthorization(
          {
            url: AUTH_ENDPOINTS.REFRESH_ACCESS_TOKEN(),
          },
          getState,
          query
        );

        if (res.error) {
          return { error: res.error };
        }

        return { data: res.data.data as unknown as ApiRefreshAccessToken['data'] };
      },
    }),

    // POST
    login: build.mutation<ApiLoginReturnType['data'], ApiLoginParams>({
      query: (params) => ({
        url: AUTH_ENDPOINTS.LOGIN(),
        method: 'POST',
        data: params,
      }),
      transformResponse: (response: ApiLoginReturnType) => response.data,
    }),
    register: build.mutation<void, ApiRegisterParams>({
      query: (params) => ({
        url: AUTH_ENDPOINTS.REGISTER(),
        method: 'POST',
        data: params,
      }),
    }),

    // PUT
    forgotPassword: build.mutation<void, ApiRegisterParams>({
      query: (params) => ({
        url: AUTH_ENDPOINTS.FORGOT_PASSWORD(),
        method: 'PUT',
        data: params,
      }),
    }),
  }),
});

export const {
  useGetCSRFQuery,
  useLazyGetCSRFQuery,
  useLazyLogoutQuery,
  useLazyRefreshCSRFQuery,
  useLoginMutation,
  useLogoutQuery,
  useRefreshCSRFQuery,
  useRegisterMutation,
  useRefreshAccessTokenQuery,
  useLazyRefreshAccessTokenQuery,
  useForgotPasswordMutation,
} = extendedApi;
