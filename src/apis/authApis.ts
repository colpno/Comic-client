import {
  ApiGetCSRFReturnType,
  ApiLoginParams,
  ApiRegisterParams,
} from '~/types/apis/authApiTypes.ts';
import { AUTH_ENDPOINTS } from './apiConstants.ts';
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
      query: () => ({
        url: AUTH_ENDPOINTS.LOGOUT(),
      }),
    }),

    // POST
    login: build.mutation<void, ApiLoginParams>({
      query: (params) => ({
        url: AUTH_ENDPOINTS.LOGIN(),
        method: 'POST',
        data: params,
      }),
    }),
    register: build.mutation<void, ApiRegisterParams>({
      query: (params) => ({
        url: AUTH_ENDPOINTS.REGISTER(),
        method: 'POST',
        data: params,
      }),
    }),

    // PUT
    resetPassword: build.mutation<void, ApiRegisterParams>({
      query: (params) => ({
        url: AUTH_ENDPOINTS.RESET_PASSWORD(),
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
  useResetPasswordMutation,
} = extendedApi;
