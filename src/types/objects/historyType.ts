import { Chapter, Comic } from '~/types/index.ts';

export interface History {
  id: string;
  comic: Pick<Comic, 'title' | 'coverImageUrl'>;
  chapterNumber: Chapter['chapter'];
  nextChapter?: string;
  readAt: string;
}
