import { ApiFulfilledResponse, Filter, FilterOperators, GetRequestOperators } from '../apiTypes.ts';
import { Comic } from '../comicType.ts';
import { Follow } from '../followType.ts';
import { ApiGetComicsParams } from './comicApiTypes.ts';

export type ApiGetFollowReturnType = ApiFulfilledResponse<Follow<string | Comic>[]>;
export type ApiGetFollowParams = Partial<
  Omit<Follow, 'following'> &
    Omit<GetRequestOperators<Follow>, '_embed' | '_select'> & {
      follower?: string;
      following?: Partial<Pick<FilterOperators, 'all' | 'in' | 'nin'>> & Filter<Comic>;
      _embed?: {
        path: 'following';
        match?: Omit<ApiGetComicsParams, '_limit' | '_page' | '_sort' | '_embed'>;
        populate?: ApiGetComicsParams['_embed'];
      };
    }
>;

export type ApiAddFollowParam = Comic['id'];

export type ApiRemoveFollowParam = Follow['id'];
