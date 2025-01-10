import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import { toast } from 'react-toastify';

import { AUTH_ENDPOINTS } from '~/apis/apiConstants.ts';
import { cookieCSRFToken } from '~/configs/appConf.ts';
import { HEADER_CSRF_TOKEN } from '~/constants/commonConstants.ts';
import { ApiGetCSRFReturnType } from '~/types/apis/authApiTypes.ts';
import { ApiFailedResponse, ApiFulfilledResponse } from '~/types/apiTypes';

axios.defaults.xsrfCookieName = cookieCSRFToken;
axios.defaults.xsrfHeaderName = HEADER_CSRF_TOKEN;
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

interface ApiRequest extends Omit<AxiosRequestConfig, 'url' | 'method' | 'data' | 'params'> {
  url: string;
  method?: Method;
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
}
type BaseQuery = BaseQueryFn<ApiRequest, ApiFulfilledResponse, ApiFailedResponse>;

const baseQuery =
  ({ baseURL }: { baseURL: string } = { baseURL: '' }): BaseQuery =>
  async ({ url, method, data, params, ...axiosConfigs }, { signal }) => {
    const mutationMethods: Method[] = ['POST', 'PUT', 'PATCH', 'post', 'put', 'patch'];
    const isMutatedRequest = mutationMethods.includes(method || 'GET');
    const axiosRequestConfig: AxiosRequestConfig = {
      ...axiosConfigs,
      url: baseURL + url,
      method,
      data,
      params,
      signal,
    };

    try {
      // Fetch CSRF token if it's a mutated request
      if (isMutatedRequest) {
        const csrfResult = await axios<ApiGetCSRFReturnType>({
          url: baseURL + AUTH_ENDPOINTS.GET_CSRF(),
        });
        const csrfToken = csrfResult.data.data;

        // Set token to header
        axiosRequestConfig.headers = {
          ...axiosRequestConfig.headers,
          [HEADER_CSRF_TOKEN]: csrfToken,
        };
      }

      // Fetch data
      const result = await axios<ApiFulfilledResponse>(axiosRequestConfig);

      return { data: result.data };
    } catch (unknownError) {
      const axiosError = unknownError as AxiosError<ApiFailedResponse>;

      const status = axiosError.response?.data.code || 500;
      const success = axiosError.response?.data.error || false;
      const message =
        axiosError.response?.data.reason ||
        (unknownError as Error).message ||
        'Something went wrong, please contact with any Administrator';

      typeof message === 'string' && toast.error(message);

      return {
        error: {
          code: status,
          error: success,
          reason: message,
        },
      };
    }
  };

export default baseQuery;
