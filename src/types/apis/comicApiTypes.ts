import { ApiDataResponse, ApiFulfilledResponse, GetRequestOperators } from '~/types/apiTypes.ts';
import { Comic } from '~/types/comicType.ts';

type AllowedEmbed = 'artist' | 'author' | 'cover_art' | 'manga' | 'tag';

export type ApiGetComicsReturnType = ApiFulfilledResponse<Comic[]>;
export interface ApiGetComicsParams
  extends Partial<
      Pick<Comic, 'title' | 'year' | 'type' | 'createdAt' | 'updatedAt' | 'contentRating'>
    >,
    Pick<GetRequestOperators, '_limit' | '_page'> {
  ids?: Comic['id'][];
  status?: Comic['status'][];
  hasAvailableChapters?: boolean;
  includedTags?: string[];
  includedTagsMode?: 'AND' | 'OR';
  excludedTags?: string[];
  excludedTagsMode?: 'AND' | 'OR';
  _embed?: AllowedEmbed[] | AllowedEmbed;
  _sort?: Partial<
    Record<
      | keyof Pick<Comic, 'title' | 'year' | 'createdAt' | 'updatedAt' | 'latestUploadedChapter'>
      | 'followedCount'
      | 'rating'
      | 'relevance',
      'asc' | 'desc'
    >
  >;
}

export type ApiGetComicReturnType = ApiDataResponse<Comic>;
export interface ApiGetComicParams {
  title: Comic['title'];
  _embed?: (AllowedEmbed | 'creator')[];
}
