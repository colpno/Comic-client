import {
  ApiDataResponse,
  ApiFulfilledResponse,
  ApiGetRequestOperators,
  ApiSort,
  Chapter,
  Comic,
} from '~/types/index.ts';

type AllowedInclude = 'emptyPages' | 'futurePublishAt' | 'externalUrl';

export type ApiGetChaptersReturnType = ApiFulfilledResponse<Chapter[]>;
export interface ApiGetChaptersParams
  extends Pick<ApiGetRequestOperators<Chapter>, '_limit' | '_page'> {
  comicId: string;
  include?: AllowedInclude[];
  exclude?: AllowedInclude[];
  _sort?: ApiSort<Pick<Chapter, 'publishAt' | 'readableAt' | 'volume' | 'chapter'>>;
}

export type ApiGetContentReturnType = ApiDataResponse<Chapter['content']>;

export type ApiReadingChapterReturnType = ApiFulfilledResponse<{
  comic: Pick<Comic, 'id' | 'title' | 'coverImageUrl'>;
  chapter: Chapter;
}>;
export interface ApiReadingChapterParams {
  title: string;
  chapterNumber: string;
}
