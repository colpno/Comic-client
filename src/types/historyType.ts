import { Chapter } from './chapterType.ts';
import { Comic } from './comicType.ts';
import { User } from './userTypes.ts';

/**
 * @param C Comic
 * @param Ch Chapter
 * @param U User
 */
export interface History<
  C extends string | Comic = string,
  Ch extends string | Chapter = string,
  U extends string | User = string
> {
  id: string;
  comic: C;
  chapter: Ch;
  user: U;
  readAt: string;
  createdAt: string;
  updatedAt: string;
}
