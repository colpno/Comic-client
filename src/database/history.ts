import { faker } from '@faker-js/faker';

import { generateChapters } from './chapter.ts';
import { generateComics } from './comics.ts';
import { user } from './user.ts';

interface Options {
  includeUser?: boolean;
  includeComic?: boolean;
  includeChapter?: boolean;
}

export const generateHistories = (count: number, options?: Options) => {
  return faker.helpers.multiple(
    () => ({
      id: faker.database.mongodbObjectId(),
      comic: options?.includeComic ? generateComics(1)[0] : faker.database.mongodbObjectId(),
      chapter: options?.includeChapter ? generateChapters(1)[0] : faker.database.mongodbObjectId(),
      user: options?.includeUser ? user : faker.database.mongodbObjectId(),
      readAt: faker.date.recent().toISOString(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }),
    { count }
  );
};
