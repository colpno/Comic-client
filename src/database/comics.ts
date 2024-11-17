import { faker } from '@faker-js/faker';

import { Comic } from '~/types/comicType.ts';

export const generateComics = (count: number) => {
  return faker.helpers.multiple(
    (): Comic => ({
      id: faker.database.mongodbObjectId(),
      type: faker.helpers.arrayElement(['manga', 'manhwa', 'manhua']),
      title: faker.commerce.productName(),
      altTitles: faker.helpers.multiple(faker.commerce.productName, {
        count: faker.helpers.rangeToNumber({ min: 0, max: 3 }),
      }),
      description: faker.commerce.productDescription(),
      isLocked: faker.datatype.boolean(),
      lastVolume: faker.helpers.rangeToNumber({ min: 1, max: 50 }).toString(),
      lastChapter: faker.helpers.rangeToNumber({ min: 1, max: 100 }).toString(),
      status: faker.helpers.arrayElement(['ongoing', 'hiatus', 'completed', 'cancelled']),
      year: faker.date.past().getFullYear(),
      contentRating: faker.helpers.arrayElement(['suggestive']),
      tags: faker.helpers.multiple(
        () => ({
          id: faker.database.mongodbObjectId(),
          name: faker.commerce.productAdjective(),
          description: faker.commerce.productDescription(),
          group: faker.helpers.arrayElement(['theme', 'genre']),
        }),
        { count: faker.helpers.rangeToNumber({ min: 5, max: 12 }) }
      ),
      state: faker.helpers.arrayElement(['published', 'draft']),
      chapterNumbersResetOnNewVolume: faker.datatype.boolean(),
      chapters: faker.helpers.multiple(faker.database.mongodbObjectId, {
        count: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
      }),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      latestUploadedChapter: faker.database.mongodbObjectId(),
      coverImageUrl: faker.image.url({ width: 512, height: 728 }),
      related: faker.helpers.multiple(faker.database.mongodbObjectId, {
        count: faker.helpers.rangeToNumber({ min: 0, max: 5 }),
      }),
      authors: faker.helpers.multiple(
        () => ({
          id: faker.database.mongodbObjectId(),
          name: faker.person.fullName(),
          createdAt: faker.date.past().toISOString(),
          updatedAt: faker.date.recent().toISOString(),
        }),
        { count: faker.helpers.rangeToNumber({ min: 1, max: 3 }) }
      ),
      artists: faker.helpers.multiple(
        () => ({
          id: faker.database.mongodbObjectId(),
          name: faker.person.fullName(),
          createdAt: faker.date.past().toISOString(),
          updatedAt: faker.date.recent().toISOString(),
        }),
        { count: faker.helpers.rangeToNumber({ min: 1, max: 3 }) }
      ),
    }),
    { count }
  );
};

export const comic: Comic = {
  id: '30460ee1-e7c1-4b1a-90a0-6861f9992c17',
  type: 'manga',
  title: 'Eyeshield 21',
  altTitles: [],
  description:
    "Wimpy Sena Kobayakawa has been running away from bullies all his life. But when the American football gear comes on, things change\u2013Sena's speed and uncanny ability to elude big bullies just might give him what it takes to become a great high school American football hero! Enjoy all the bone-crushing action and slapstick comedy that this heartwarming coming-of-age story has to offer.",
  isLocked: false,
  lastVolume: '37',
  lastChapter: '333',
  status: 'completed',
  year: 2002,
  contentRating: 'suggestive',
  chapters: [],
  tags: [
    {
      id: '07251805-a27e-4d59-b488-f0bfbec15168',
      name: 'Thriller',
      description: '',
      group: 'genre',
    },
    {
      id: '391b0423-d847-456f-aff0-8b0cfc03066b',
      name: 'Action',
      description: '',
      group: 'genre',
    },
    {
      id: '4d32cc48-9f00-4cca-9b5a-a839f0764984',
      name: 'Comedy',
      description: '',
      group: 'genre',
    },
    {
      id: '69964a64-2f90-4d33-beeb-f3ed2875eb4c',
      name: 'Sports',
      description: '',
      group: 'genre',
    },
    {
      id: '87cc87cd-a395-47af-b27a-93258283bbc6',
      name: 'Adventure',
      description: '',
      group: 'genre',
    },
    {
      id: 'b9af3a63-f058-46de-a9a0-e0c13906197a',
      name: 'Drama',
      description: '',
      group: 'genre',
    },
    {
      id: 'caaa44eb-cd40-4177-b930-79d3ef2afe87',
      name: 'School Life',
      description: '',
      group: 'theme',
    },
    {
      id: 'da2d50ca-3018-4cc0-ac7a-6b7d472a29ea',
      name: 'Delinquents',
      description: '',
      group: 'theme',
    },
    {
      id: 'e5301a23-ebd9-49dd-a0cb-2add944c7fe9',
      name: 'Slice of Life',
      description: '',
      group: 'genre',
    },
  ],
  state: 'published',
  chapterNumbersResetOnNewVolume: false,
  createdAt: '2018-02-05T07:33:35+00:00',
  updatedAt: '2024-10-09T12:09:09+00:00',
  latestUploadedChapter: 'ca2a1bdf-99d6-41ee-90a3-dd3bc630217f',
  authors: [
    {
      id: '6afbe7ae-36a4-4d95-aacc-610bd9c64332',
      name: 'Inagaki Riichiro',
      createdAt: '2021-04-19T21:59:45+00:00',
      updatedAt: '2021-04-19T21:59:45+00:00',
    },
  ],
  artists: [
    {
      id: '47cd4e57-3fc4-4d76-97e4-b3933a5b05ef',
      name: 'Murata Yuusuke',
      createdAt: '2021-04-19T21:59:45+00:00',
      updatedAt: '2023-12-11T14:13:54+00:00',
    },
  ],
  coverImageUrl: '4e777511-b9b7-4491-8de5-dda3e699f2a7.jpg',
  related: [
    '030539f7-fe9d-492c-9dc9-91b10b4f3eb1',
    '282a8dd3-ff00-4a81-86b0-8c9ac4271bdb',
    '3bce85cf-0459-42ca-be2d-5ec56445fce9',
    '8f8c4f0e-93f5-433e-ba13-017746b485ec',
    'a14176d9-9832-43d2-b98a-f16fa4e82021',
    'a749ae8b-14ab-4c76-b8f3-999d743b4c5b',
    'f445aff3-fc8d-4784-9b82-c808387934be',
  ],
};
