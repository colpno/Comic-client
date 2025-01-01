import { faker } from '@faker-js/faker';

import { generateComics } from './comics.ts';
import { user } from './user.ts';

interface Options {
  includeUser?: boolean;
  includeComic?: boolean;
}

export const generateFollows = (count: number, options?: Options) => {
  return faker.helpers.multiple(
    () => ({
      id: faker.database.mongodbObjectId(),
      comic: options?.includeComic ? generateComics(1)[0] : faker.database.mongodbObjectId(),
      user: options?.includeUser ? user : faker.database.mongodbObjectId(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }),
    { count }
  );
};
