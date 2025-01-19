import { Chapter } from './chapterType.ts';
import { Comic } from './comicType.ts';

export interface History {
  id: string;
  comic: Comic;
  chapter: Chapter;
  readAt: string;
}
