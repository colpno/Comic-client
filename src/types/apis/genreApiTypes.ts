import { ApiDataResponse } from '~/types/apiTypes.ts';
import { Genre } from '../genreType.ts';

export type ApiGetGenresReturnType = ApiDataResponse<Genre[]>;
