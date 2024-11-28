import { faker } from '@faker-js/faker';

import { Chapter } from '~/types/chapterType.ts';

export const generateChapters = (count: number) => {
  const contentLength = faker.helpers.rangeToNumber({ min: 1, max: 100 });

  return faker.helpers.multiple(
    (_, id): Chapter => ({
      id: faker.database.mongodbObjectId(),
      title: faker.commerce.productName(),
      volume: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
      chapter: id + 1,
      content: faker.helpers.multiple(
        () => ({
          data: faker.image.urlPicsumPhotos(),
          dataSaver: faker.image.urlPicsumPhotos(),
        }),
        { count: contentLength }
      ),
      publishAt: faker.date.recent().toISOString(),
      readableAt: faker.helpers.arrayElement([faker.date.recent().toISOString(), undefined]),
      pages: contentLength,
    }),
    { count }
  );
};
