import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { useObserver } from '~/hooks/index.ts';
import { useReadingLayoutContext } from '~/layouts/ReadingLayout/ReadingLayoutContext.ts';
import NotFoundPage from '../ErrorPage/components/NotFoundPage.tsx';
import Content from './components/ReadingPageImages.tsx';
import Pagination from './components/ReadingPagePagination';

function ReadingPage() {
  const { toggleHeaderVisibility, setHeaderVisibility, chapterPagination, chapters, content } =
    useReadingLayoutContext();
  const { setElementRef } = useObserver(undefined, () => setHeaderVisibility(true));
  const currentChapter = chapterPagination?.current;

  if (!currentChapter) {
    return <NotFoundPage title="Seems like you entered the wrong chapter." />;
  }

  return (
    <div>
      <div onClick={toggleHeaderVisibility} ref={setElementRef}>
        <div className="mx-auto shadow-xl w-full md:w-[728px]">
          <Content id={currentChapter.id} images={content} />
        </div>
      </div>
      <Container maxWidth="lg" className="mt-24 md:mt-40">
        <Pagination chapters={chapters} />
      </Container>
      <Helmet>
        <title>{`Chapter ${currentChapter.chapter} - ${currentChapter.title} - Comic`}</title>
      </Helmet>
    </div>
  );
}

export default ReadingPage;
