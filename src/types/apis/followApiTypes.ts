import {
  ApiDataResponse,
  ApiFulfilledResponse,
  ApiGetComicsParams,
  ApiGetRequestOperators,
  Comic,
  Follow,
} from '~/types/index.ts';

export type ApiGetFollowsReturnType = ApiFulfilledResponse<Follow<string | Comic>[]>;
export type ApiGetFollowsParams = Partial<
  Omit<Follow, 'following'> &
    Omit<ApiGetRequestOperators<Follow>, '_embed'> & {
      follower?: string;
      following?: string;
      _embed?: {
        path: 'following';
        match?: Omit<ApiGetComicsParams, '_limit' | '_page' | '_sort' | '_embed'>;
        populate?: ApiGetComicsParams['_embed'];
      };
    }
>;

export type ApiGetFollowReturnType = ApiDataResponse<Follow<string | Comic>>;
export type ApiGetFollowParams = Pick<Follow, 'following'> &
  Partial<
    Omit<Follow, 'following' | 'follower'> &
      Pick<ApiGetRequestOperators<Follow>, '_select'> & {
        follower?: string;
        following?: string;
        _embed?: {
          path: 'following';
          match?: Omit<ApiGetComicsParams, '_limit' | '_page' | '_sort' | '_embed'>;
          populate?: ApiGetComicsParams['_embed'];
        };
      }
  >;

export type ApiAddFollowParam = Comic['id'];

export type ApiRemoveFollowParam = Follow['id'];
