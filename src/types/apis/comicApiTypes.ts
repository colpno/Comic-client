import { ApiFulfilledResponse, GetRequestOperators } from '~/types/apiTypes.ts';
import { Comic } from '~/types/comicType.ts';

type AllowedEmbed = 'artist' | 'author' | 'cover_art' | 'manga' | 'tag';

export type ApiGetComicsReturnType = ApiFulfilledResponse<Comic[]>;
export interface ApiGetComicsParams
  extends Partial<
      Pick<
        Comic,
        'title' | 'year' | 'type' | 'createdAt' | 'updatedAt' | 'status' | 'contentRating'
      >
    >,
    Pick<GetRequestOperators, '_limit' | '_page'> {
  hasAvailableChapters?: boolean;
  includedTags?: string[];
  includedTagsMode?: 'AND' | 'OR';
  _embed?: AllowedEmbed[] | AllowedEmbed;
  _sort?: Partial<
    Record<
      | keyof Pick<Comic, 'title' | 'year' | 'createdAt' | 'updatedAt' | 'latestUploadedChapter'>
      | 'followedCount'
      | 'relevance',
      'asc' | 'desc'
    >
  >;
}

export type ApiGetComicReturnType = ApiFulfilledResponse<Comic>;
export interface ApiGetComicParams {
  id: Comic['id'];
  _embed?: (AllowedEmbed | 'creator')[];
}
