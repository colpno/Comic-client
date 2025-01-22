import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query';
import { TypedLazyQueryTrigger } from '@reduxjs/toolkit/query/react';
import { useEffect, useState } from 'react';

import { PAGINATION_INITIAL_PAGE } from '~/constants/commonConstants.ts';
import { ApiFailedResponse, ApiFulfilledResponse, ApiPaginatedResponse } from '~/types/index.ts';

type LazyGetTriggerType<D, P> = TypedLazyQueryTrigger<
  D,
  P,
  BaseQueryFn<string | FetchArgs, unknown, ApiFailedResponse>
>;
type ApiCaller<D, P> =
  | LazyGetTriggerType<ApiFulfilledResponse<D>, P>
  | LazyGetTriggerType<ApiFulfilledResponse<D>, P | void>;

type Result<D> = {
  data: D;
  pagination: Partial<
    Exclude<Exclude<ApiPaginatedResponse<D>['metadata'], undefined>['pagination'], undefined>
  >;
};

type Params = { _page?: number; _limit?: number } | { _page: number; _limit: number };

/**
 * A custom hook to handle infinite pagination.
 * @param initialData an array of data to be set initially.
 * @param initialParams  an object of parameters to be set initially.
 * @param apiCaller  a function to fetch data.
 */
const useInfinitePagination = <
  D extends ApiFulfilledResponse['data'][] = [], // Response type
  P extends Params = {} // Request parameters type
>(
  initialData: D,
  initialParams: P,
  apiCaller: ApiCaller<D, P>
) => {
  const [{ data, pagination }, setResult] = useState<Result<D>>({
    data: initialData,
    pagination: {},
  });
  const [params, setParams] = useState<P>({
    ...initialParams,
    _page: PAGINATION_INITIAL_PAGE,
  });

  /**
   * A function to handle page change: Set next page.\
   * It will be triggered when the target is intersected.\
   * If the number of data is less than the limit, which means there is no more data to fetch, then it will not be triggered.
   */
  const handleIntersect = async () => {
    if (params._limit && data.length < params._limit) return;
    setParams((prev) => ({
      ...prev,
      _page: prev._page! + 1,
    }));
  };

  /**
   * A helper function to set the new parameters.\
   * If not contains `_page`, then new products will be fetched from the first page.
   * @param p New parameters to be set, or a function that receives the previous parameters and returns the new parameters.
   */
  const handleSetParams: typeof setParams = (p) => {
    const newParams = typeof p === 'function' ? p(params) : p;

    // If not contains _page, then new products will be fetched from the first page.
    const keys = Object.keys(newParams);
    if (!keys.includes('_page')) {
      newParams._page = PAGINATION_INITIAL_PAGE;
    }

    setParams(newParams);
  };

  useEffect(() => {
    (async () => {
      const response = await apiCaller(params).unwrap();
      const newData = response.data;

      /**
       * A helper function to set the new data.
       * @param d New data to be set, or a function that receives the previous data and returns the new data.
       */
      const handleSetResult = (d: D | ((p: D) => D)) => {
        setResult((prev) => ({
          data: typeof d === 'function' ? d(prev.data) : d,
          pagination: response.metadata?.pagination || {},
        }));
      };

      // If the page is the first page.
      // Which means at least one of query params are different except for the page.
      // Then, the new data will be replaced with the existing data.
      if (params._page === PAGINATION_INITIAL_PAGE) {
        handleSetResult(newData);
      } else {
        // Otherwise, the new data with same query params will be appended to the existing data.
        handleSetResult((prev) => [...prev, ...newData] as D);
      }
    })();
  }, [params]);

  return {
    data,
    pagination,
    params,
    /**
     * A helper function to set the new parameters.\
     * If not contains `_page`, then new products will be fetched from the first page.
     * @param p New parameters to be set, or a function that receives the previous parameters and returns the new parameters.
     */
    setParams: handleSetParams,
    /**
     * A function to handle page change: Set next page.\
     * It will be triggered when the target is intersected.\
     * If the number of data is less than the limit, which means there is no more data to fetch, then it will not be triggered.
     */
    handleIntersect,
  };
};

export default useInfinitePagination;
