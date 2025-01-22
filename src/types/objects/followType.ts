import { Comic } from '~/types/index.ts';

/**
 * @param C Comic
 */
export interface Follow<C extends string | Comic = string> {
  id: string;
  following: C;
  addedAt: string;
  createdAt: string;
  updatedAt: string;
}
