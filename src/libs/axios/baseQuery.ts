import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

import { FailedApiResponse, FulfilledResponse } from '~/types/apiTypes';

interface ApiRequest {
  url: string;
  method?: Method;
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
}
type BaseQuery = BaseQueryFn<ApiRequest, FulfilledResponse, FailedApiResponse>;

const baseQuery =
  ({ baseURL }: { baseURL: string } = { baseURL: '' }): BaseQuery =>
  async ({ url, method, data, params }, { signal }) => {
    try {
      const result = await axios<FulfilledResponse>({
        url: baseURL + url,
        method,
        data,
        params,
        signal,
      });
      return { data: result.data };
    } catch (unknownError) {
      const axiosError = unknownError as AxiosError<FailedApiResponse>;

      const message =
        axiosError.response?.data.reason ||
        'Something went wrong, please contact with any Administrator';
      const status = axiosError.response?.data.code || 500;
      const success = axiosError.response?.data.error || false;

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
