import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import { toast } from 'react-toastify';

import { AUTH_ENDPOINTS } from '~/apis/apiConstants.ts';
import { HEADER_CSRF } from '~/constants/commonConstants.ts';
import {
  ApiFailedResponse,
  ApiFulfilledResponse,
  ApiRequestArgs,
  ValidationError,
} from '~/types/apis/apiTypes';
import { ApiGetCSRFReturnType } from '~/types/index.ts';

axios.defaults.withCredentials = true;

type BaseQuery = BaseQueryFn<ApiRequestArgs, ApiFulfilledResponse, ApiFailedResponse>;

const mutationMethods: Method[] = [
  'POST',
  'PUT',
  'PATCH',
  'post',
  'put',
  'patch',
  'DELETE',
  'delete',
];

const baseQuery =
  ({ baseURL }: { baseURL: string } = { baseURL: '' }): BaseQuery =>
  async ({ url, method, data, params, ...axiosConfigs }, { signal }) => {
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
          [HEADER_CSRF]: csrfToken,
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

      if (typeof message === 'string') toast.error(message);

      // Validation errors
      if (Array.isArray(message)) {
        const validationErrors = message as ValidationError[];
        validationErrors.forEach(({ message }) => {
          toast.error(`Validation error: ${message}`);
        });
      }

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
