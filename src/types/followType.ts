import { Comic } from './comicType.ts';
import { User } from './userTypes.ts';

/**
 * @param C Comic
 * @param U User
 */
export interface Follow<C extends string | Comic = string, U extends string | User = string> {
  id: string;
  comic: C;
  user: U;
  createdAt: string;
  updatedAt: string;
}
