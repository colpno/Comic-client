import { ApiFulfilledResponse, GetRequestOperators } from '~/types/apiTypes.ts';
import { Chapter } from '~/types/chapterType.ts';

type AllowedInclude = 'emptyPages' | 'futurePublishAt' | 'externalUrl';

export type ApiGetChaptersReturnType = ApiFulfilledResponse<Chapter[]>;
export interface ApiGetChaptersParams
  extends Pick<GetRequestOperators<Chapter>, '_limit' | '_page' | '_sort'> {
  comicId: string;
  include?: AllowedInclude[];
  exclude?: AllowedInclude[];
}

export type ApiGetContentReturnType = ApiFulfilledResponse<Chapter['content']>;
