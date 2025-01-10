import { faker } from '@faker-js/faker';

import { Comic } from '~/types/comicType.ts';
import { Follow } from '~/types/followType.ts';
import { User } from '~/types/userTypes.ts';
import { generateComics } from './comics.ts';
import { user } from './user.ts';

interface Options {
  includeUser?: boolean;
  includeComic?: boolean;
}

type ReturnType = Follow<Comic[] | string[], User | string>;

export const generateFollows = (count: number, options?: Options) => {
  return faker.helpers.multiple(
    (): ReturnType => ({
      id: faker.database.mongodbObjectId(),
      follower: options?.includeUser ? user : faker.database.mongodbObjectId(),
      // @ts-expect-error
      following: options?.includeComic ? generateComics(1)[0] : faker.database.mongodbObjectId(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }),
    { count }
  );
};
