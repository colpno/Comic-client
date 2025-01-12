import { Chapter } from './chapterType.ts';
import { Artist, Author } from './creatorTypes.ts';

type Status = 'ongoing' | 'completed' | 'hiatus' | 'cancelled';
type State = 'published' | 'draft';
type Type = 'manga' | 'manhwa' | 'manhua';
type ContentRating = 'safe' | 'suggestive';
type TagGroup = 'theme' | 'genre' | 'format';

interface Tag {
  id: string;
  name: string;
  description: string;
  group: TagGroup;
}

export interface Comic {
  id: string;
  type: Type;
  title: string;
  altTitles?: string[];
  description?: string;
  isLocked: boolean;
  lastVolume?: string;
  lastChapter?: string;
  status: Status;
  year: number;
  contentRating?: ContentRating;
  tags: Tag[];
  state: State;
  chapterNumbersResetOnNewVolume: boolean;
  chapters: (Chapter | Chapter['id'])[];
  latestUploadedChapter?: number;
  coverImageUrl: string;
  related?: (Comic | string)[];
  authors: Author[];
  artists: Artist[];
  createdAt: string;
  updatedAt: string;
}
