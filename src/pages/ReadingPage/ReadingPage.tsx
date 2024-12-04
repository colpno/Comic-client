import { faker } from '@faker-js/faker';
import { Container } from '@mui/material';

import { useReadingLayoutContext } from '~/layouts/ReadingLayout/ReadingLayoutContext.ts';
import { Chapter } from '~/types/chapterType.ts';
import Content from './components/ReadingPageImages.tsx';
import Pagination from './components/ReadingPagePagination';

const chapters = faker.helpers.multiple<Chapter>(
  () => ({
    id: faker.database.mongodbObjectId(),
    title: faker.lorem.words(),
    chapter: faker.helpers.rangeToNumber({ min: 1, max: 100 }),
    content: faker.helpers.multiple<Chapter['content'][number]>(
      () => {
        const image = faker.image.urlPicsumPhotos();
        return {
          data: image,
          dataSaver: image,
        };
      },
      {
        count: faker.helpers.rangeToNumber({ min: 1, max: 1 }),
      }
    ),
  }),
  { count: 1 }
);

function ReadingPage() {
  const { toggleHeaderVisibility } = useReadingLayoutContext();
  const currentChapter = chapters[0];

  return (
    <div>
      <div onClick={toggleHeaderVisibility}>
        <div className="mx-auto shadow-xl w-full md:w-[728px]">
          <Content id={currentChapter.id} images={currentChapter.content} />
        </div>
      </div>
      <Container maxWidth="lg" className="mt-24 md:mt-40">
        <Pagination chapters={chapters} />
      </Container>
    </div>
  );
}

export default ReadingPage;
