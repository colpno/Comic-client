import {
  ApiDataResponse,
  ApiFulfilledResponse,
  GetRequestOperators,
  Sort,
} from '~/types/apiTypes.ts';
import { Chapter } from '~/types/chapterType.ts';
import { Comic } from '../comicType.ts';

type AllowedInclude = 'emptyPages' | 'futurePublishAt' | 'externalUrl';

export type ApiGetChaptersReturnType = ApiFulfilledResponse<Chapter[]>;
export interface ApiGetChaptersParams
  extends Pick<GetRequestOperators<Chapter>, '_limit' | '_page'> {
  comicId: string;
  include?: AllowedInclude[];
  exclude?: AllowedInclude[];
  _sort?: Sort<Pick<Chapter, 'publishAt' | 'readableAt' | 'volume' | 'chapter'>>;
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
