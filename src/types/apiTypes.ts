/* 
======================================================================
  
  Response types for API requests.

======================================================================
*/

import { PrimitiveValue } from './commonTypes.ts';

export interface ApiDataResponse<D = unknown> {
  data: D;
}
export interface ApiPaginatedResponse<D = unknown> extends ApiDataResponse<D> {
  metadata?: {
    pagination?: {
      /** The current page. */
      currentPage: number;
      /** The links to navigate pages. */
      links: {
        /**
         * The link to the next page.
         */
        next?: string;
        /**
         * The link to the previous page.
         */
        previous?: string;
      };
      /** The maximum items in 1 page. */
      perPage: number;
      /** The total of items. */
      totalItems: number;
      /** The total of pages. */
      totalPages: number;
    };
  };
}
export type ApiFulfilledResponse<D = unknown> = ApiPaginatedResponse<D> | ApiDataResponse<D>;

export interface ValidationError {
  /** Form field name. */
  path: string;
  /** Error message. */
  message: string;
}
/**
 * @param VE If true, the reason will be an array of `ValidationError`. Otherwise, `string`.
 */
export interface ApiFailedResponse {
  /** HTTP status code. */
  code: number;
  /** Indicate the request as error or not. */
  error: boolean;
  reason: string | ValidationError[];
}

/* 
======================================================================
  
  Request types for API requests.

======================================================================
*/

export interface FilterOperators {
  /** Contain string. */
  like: string;
  /** Equal. */
  eq: PrimitiveValue;
  /** Not equal. */
  ne: PrimitiveValue;
  /** Not null or the field is exist. */
  exists: boolean;
  /** Greater than. */
  gt: Exclude<PrimitiveValue, boolean>;
  /** Greater than or equal. */
  gte: Exclude<PrimitiveValue, boolean>;
  /** Lesser than. */
  lt: Exclude<PrimitiveValue, boolean>;
  /** Lesser than or equal. */
  lte: Exclude<PrimitiveValue, boolean>;
  /** Compare array size. */
  size:
    | number
    | { ne: number }
    | { gte: number }
    | { gt: number }
    | { lte: number }
    | { lt: number };
  /** Has all values. */
  all: PrimitiveValue[];
  /** Has one of the values. */
  in: PrimitiveValue[];
  /** Has no value in. */
  nin: PrimitiveValue[];
  /** This or that. */
  or: Record<
    string,
    Pick<
      FilterOperators,
      'like' | 'eq' | 'ne' | 'exists' | 'gt' | 'gte' | 'lt' | 'lte' | 'size' | 'all' | 'in' | 'nin'
    >
  >[];
  /** This and that. */
  and: FilterOperators['or'];
}

export type Embed<D = Record<string, unknown>> = {
  /**
   * The field which will be populated.
   * @example
   * 'field'
   */
  path: string;
  /**
   * Choose the fields to return or not. By define the field with or without the prefix minus sign "-".
   * @example
   * 'field1 field2 -field3'
   */
  select?: string;
  /**
   * The filter of the populated doc.
   * @example
   * { field1: 'value1', field2: { gt: 10 } }
   */
  match?: Partial<Record<keyof D, Partial<FilterOperators>>>;
  /**
   * For deep population. Repeat the embed object.
   */
  populate?: GetRequestOperators<D>['_embed'];
};

export type SortOrder = 'asc' | 'desc';

/**
 * @example
 * { field1: 'asc', field2: 'desc' }
 */
export type Sort<D = Record<string, unknown>> = Partial<Record<keyof D, SortOrder>>;

/**
 * The filter for the query.
 * @example
 * { field1: 'value1', field2: { gt: 10 } }
 */
export type Filter<D = Record<string, unknown>> = Partial<
  Record<keyof D, PrimitiveValue | Partial<FilterOperators>>
>;

export interface GetRequestOperators<D = undefined> {
  /**
   * Choose the fields to return or not. By define the field with or without the prefix minus sign "-".
   * @example
   * 'field1 field2 -field3'
   */
  _select?: string;
  /**
   * Embed the related collection in the result.
   * @example
   * 'field'
   * @example
   * { path: 'field' }
   * @example
   * [{ path: 'field' }]
   */
  _embed?: string | Embed<D> | Embed<D>[];
  /**
   * Sort column(s).
   * @example
   * { field1: 'asc', field2: 'desc' }
   */
  _sort?: Sort<D>;
  /** Limit the number of items per page. */
  _limit?: number;
  /** For paginating. */
  _page?: number;
}
