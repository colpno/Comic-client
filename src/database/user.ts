import { faker } from '@faker-js/faker';

import { User } from '~/types/userTypes';

export const user: User = {
  id: faker.database.mongodbObjectId(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
};

export const users: User[] = faker.helpers.multiple(() => user, { count: 5 });
