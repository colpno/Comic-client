import { Chapter } from './chapterType.ts';
import { Comic } from './comicType.ts';

export interface History {
  id: string;
  comic: Pick<Comic, 'title' | 'coverImageUrl'>;
  chapterNumber: Chapter['chapter'];
  nextChapter?: Chapter['chapter'];
  readAt: string;
}
