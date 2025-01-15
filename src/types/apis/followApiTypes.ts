import { ApiFulfilledResponse, GetRequestOperators } from '../apiTypes.ts';
import { Comic } from '../comicType.ts';
import { Follow } from '../followType.ts';
import { ApiGetComicsParams } from './comicApiTypes.ts';

export type ApiGetFollowsReturnType = ApiFulfilledResponse<Follow<string | Comic>[]>;
export type ApiGetFollowsParams = Partial<
  Omit<Follow, 'following'> &
    Omit<GetRequestOperators<Follow>, '_embed'> & {
      follower?: string;
      following?: string;
      _embed?: {
        path: 'following';
        match?: Omit<ApiGetComicsParams, '_limit' | '_page' | '_sort' | '_embed'>;
        populate?: ApiGetComicsParams['_embed'];
      };
    }
>;

export type ApiGetFollowReturnType = ApiFulfilledResponse<Follow<string | Comic>>;
export type ApiGetFollowParams = Pick<Follow, 'following'> &
  Partial<
    Omit<Follow, 'following' | 'follower'> &
      Pick<GetRequestOperators<Follow>, '_select'> & {
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
