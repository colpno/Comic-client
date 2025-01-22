import {
  ApiDataResponse,
  ApiFulfilledResponse,
  ApiGetRequestOperators,
  Comic,
} from '~/types/index.ts';

type AllowedEmbed = 'artist' | 'author' | 'cover_art' | 'manga' | 'tag';

export type ApiGetComicsReturnType = ApiFulfilledResponse<Comic[]>;
export interface ApiGetComicsParams
  extends Partial<
      Pick<Comic, 'title' | 'year' | 'type' | 'createdAt' | 'updatedAt' | 'contentRating'>
    >,
    Pick<ApiGetRequestOperators, '_limit' | '_page'> {
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
