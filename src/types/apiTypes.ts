/* 
======================================================================
  
  Response types for API requests.

======================================================================
*/

import { PrimitiveType } from './commonTypes.ts';

export interface SuccessfulApiResponse<D = unknown> {
  data: D;
}
export interface PaginatedApiResponse<D = unknown> extends SuccessfulApiResponse<D> {
  metadata: {
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
}
export type FulfilledResponse<D = unknown> = PaginatedApiResponse<D> | SuccessfulApiResponse<D>;

export interface ValidationError {
  /** Form field name. */
  path: string;
  /** Error message. */
  message: string;
}
export interface FailedApiResponse {
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
  eq: PrimitiveType;
  /** Not equal. */
  ne: PrimitiveType;
  /** Not null or the field is exist. */
  exists: boolean;
  /** Greater than. */
  gt: Exclude<PrimitiveType, boolean>;
  /** Greater than or equal. */
  gte: Exclude<PrimitiveType, boolean>;
  /** Lesser than. */
  lt: Exclude<PrimitiveType, boolean>;
  /** Lesser than or equal. */
  lte: Exclude<PrimitiveType, boolean>;
  /** Compare array size. */
  size:
    | number
    | { ne: number }
    | { gte: number }
    | { gt: number }
    | { lte: number }
    | { lt: number };
  /** Has all values. */
  all: PrimitiveType[];
  /** Has one of the values. */
  in: PrimitiveType[];
  /** Has no value in. */
  nin: PrimitiveType[];
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
  Record<keyof D, PrimitiveType | Partial<FilterOperators>>
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
