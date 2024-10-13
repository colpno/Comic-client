import { faker } from '@faker-js/faker';

import { User } from '~/types/userTypes';

export const user: User = {
  _id: faker.database.mongodbObjectId(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
};

export const users: User[] = faker.helpers.multiple(() => user, { count: 5 });
