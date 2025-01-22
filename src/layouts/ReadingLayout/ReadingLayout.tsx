import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { useReadingChapterQuery } from '~/apis/chapterApis.ts';
import DataFetching from '~/components/DataFetching.tsx';
import { addReadingHistory } from '~/libs/redux/slices/commonSlice.ts';
import { useAppDispatch } from '~/libs/redux/store.ts';
import NotFoundPage from '~/pages/ErrorPage/components/NotFoundPage.tsx';
import Footer from '../components/Footer.tsx';
import Header from './components/ReadingLayoutHeader';
import {
  ReadingLayoutContextProvider as ContextProvider,
  ReadingLayoutContextType as ContextType,
} from './ReadingLayoutContext.ts';

function ReadingLayout() {
  const dispatch = useAppDispatch();
  const [headerVisibility, setHeaderVisibility] = useState(true);
  const { comictitle, chapterNumber } = useParams();
  const { data, isFetching, isLoading } = useReadingChapterQuery({
    title: comictitle!,
    chapterNumber: chapterNumber!,
  });
  const readingData = data?.data;
  const pagination = data?.metadata?.pagination;

  // Save to reading history
  useEffect(() => {
    if (readingData?.comic && readingData?.chapter && pagination) {
      const { comic, chapter } = readingData;

      dispatch(
        addReadingHistory({
          id: comic.id,
          readAt: new Date().toISOString(),
          comic: {
            title: comic.title,
            coverImageUrl: comic.coverImageUrl,
          },
          chapterNumber: chapter.chapter,
          nextChapter: pagination.links.next,
        })
      );
    }
  }, [readingData?.comic, readingData?.chapter, pagination]);

  const toggleHeaderVisibility = () => setHeaderVisibility((prev) => !prev);
  const contextValues: ContextType = {
    headerVisibility: headerVisibility,
    setHeaderVisibility: setHeaderVisibility,
    toggleHeaderVisibility: toggleHeaderVisibility,
    comic: readingData?.comic,
    chapter: readingData?.chapter,
    pagination: {
      previous: pagination?.links.previous,
      next: pagination?.links.next,
    },
  };

  if (isFetching || isLoading) {
    return (
      <div className="pt-16 mt-header md:mt-header-md">
        <DataFetching />
      </div>
    );
  }
  if (!data) {
    return <NotFoundPage title="Looks like the comic or chapter doesn't exist" />;
  }

  return (
    <ContextProvider value={contextValues}>
      <div className="flex flex-col min-h-dvh">
        <Header />
        <main className="flex-1 pb-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ContextProvider>
  );
}

export default ReadingLayout;
