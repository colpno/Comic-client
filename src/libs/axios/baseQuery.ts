import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

import { ApiError, ApiResponse } from '~/types/api.ts';

interface ApiRequest {
  url: string;
  method?: Method;
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
}
type BaseQuery = BaseQueryFn<ApiRequest, ApiResponse, ApiError>;

const baseQuery =
  ({ baseURL }: { baseURL: string } = { baseURL: '' }): BaseQuery =>
  async ({ url, method, data, params }, { signal }) => {
    try {
      const result = await axios<ApiResponse>({ url: baseURL + url, method, data, params, signal });
      return { data: result.data };
    } catch (unknownError) {
      const axiosError = unknownError as AxiosError<ApiError>;

      const message =
        axiosError.response?.data.message ||
        'Something went wrong, please contact with any Administrator';
      const status = axiosError.response?.data.status || 500;
      const success = axiosError.response?.data.success || false;
      const data = axiosError.response?.data.data;

      return {
        error: {
          data,
          status,
          message,
          success,
        },
      };
    }
  };

export default baseQuery;
