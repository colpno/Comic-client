/**
 * @param C Comic
 * @param Ch Chapter
 * @param U User
 */
export interface History<C = string, Ch = string, U = string> {
  id: string;
  comic: C;
  chapter: Ch;
  user: U;
  readAt: string;
  createdAt: string;
  updatedAt: string;
}
