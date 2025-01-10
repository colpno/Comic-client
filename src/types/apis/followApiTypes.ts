import { ApiFulfilledResponse, GetRequestOperators } from '../apiTypes.ts';
import { Comic } from '../comicType.ts';
import { Follow } from '../followType.ts';

export type ApiGetFollowsReturnType = ApiFulfilledResponse<Follow['following']>;
export type ApiGetFollowsParams = Partial<Follow> &
  Omit<GetRequestOperators, '_embed' | '_select' | 'id'> & {
    _embed?: 'following';
  };

export type ApiAddFollowReturnType = void;
export type ApiAddFollowParams = Pick<Follow, 'follower'> & {
  following: Comic['id'];
};

export type ApiRemoveFollowParams = {
  id: Follow['id'];
};
