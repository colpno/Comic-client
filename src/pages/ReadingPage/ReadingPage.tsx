import { Helmet } from 'react-helmet-async';

import { useObserver } from '~/hooks/index.ts';
import { useReadingLayoutContext } from '~/layouts/ReadingLayout/ReadingLayoutContext.ts';
import NotFoundPage from '../ErrorPage/components/NotFoundPage.tsx';
import Content from './components/ReadingPageContent.tsx';

function ReadingPage() {
  const { toggleHeaderVisibility, setHeaderVisibility, chapter } = useReadingLayoutContext();
  const { setElementRef } = useObserver(undefined, () => setHeaderVisibility(true));

  if (!chapter) {
    return <NotFoundPage title="Seems like you entered the wrong chapter." />;
  }

  return (
    <div>
      <div onClick={toggleHeaderVisibility} ref={setElementRef}>
        <Content images={chapter.content} />
      </div>
      <Helmet>
        <title>{`Chapter ${chapter.chapter} - ${chapter.title} - Comic`}</title>
      </Helmet>
    </div>
  );
}

export default ReadingPage;
