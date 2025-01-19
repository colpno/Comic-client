import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { useLazyGetChaptersQuery, useLazyGetContentQuery } from '~/apis/chapterApis.ts';
import { useLazyGetComicQuery } from '~/apis/comicApis.ts';
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
  const [visibility, setVisibility] = useState(true);
  const { comictitle, chapterNumber } = useParams();
  const [getComic, { data: comic, isFetching: isGetComicFetching }] = useLazyGetComicQuery();
  const [getChapters, { data: getChaptersData, isFetching: isGetChaptersFetching }] =
    useLazyGetChaptersQuery();
  const [getChapterContent, { data: content = [], isFetching: isGetContentFetching }] =
    useLazyGetContentQuery();
  const [chapterPagination, setChapterPagination] = useState<
    ContextType['chapterPagination'] | undefined
  >();
  const dispatch = useAppDispatch();

  const chapters = getChaptersData?.data || [];

  // Fetch chapter's pagination
  useEffect(() => {
    if (chapters.length > 0) {
      const currentChapterIndex = chapters.findIndex(
        (chapter) => chapter.chapter === chapterNumber
      );
      const currentChapter = chapters[currentChapterIndex] || null;
      const previousChapter = chapters[currentChapterIndex - 1] || null;
      const nextChapter = chapters[currentChapterIndex + 1] || null;

      setChapterPagination({
        current: currentChapter,
        previous: previousChapter,
        next: nextChapter,
      });

      getChapterContent(currentChapter.id);
    }
  }, [chapterNumber, chapters]);

  // Fetch ascending chapters based on comic's id
  useEffect(() => {
    if (comic) {
      getChapters({
        comicId: comic.id,
        _sort: {
          chapter: 'asc',
        },
      });
    }
  }, [comic]);

  // Fetch comic based on comic's title
  useEffect(() => {
    if (comictitle) {
      getComic({ title: comictitle });
    }
  }, [comictitle]);

  // Save reading history
  useEffect(() => {
    const currentChapter = chapterPagination?.current;

    if (comic && currentChapter) {
      dispatch(
        addReadingHistory({
          id: comic.id,
          readAt: new Date().toISOString(),
          comic,
          chapter: currentChapter,
        })
      );
    }
  }, [comic, chapterPagination?.current]);

  const toggleVisibility = () => setVisibility((prev) => !prev);

  const contextValues: ContextType = {
    headerVisibility: visibility,
    setHeaderVisibility: setVisibility,
    toggleHeaderVisibility: toggleVisibility,
    comic,
    chapters,
    chapterPagination,
    content,
  };

  if (isGetComicFetching || isGetChaptersFetching || isGetContentFetching) {
    return (
      <div className="pt-16 mt-header md:mt-header-md">
        <DataFetching />
      </div>
    );
  }
  if (!comic) {
    return <NotFoundPage title="Looks like the comic doesn't exist" />;
  }
  if (!chapterPagination?.current) {
    return <NotFoundPage title="Looks like the chapter doesn't exist" />;
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
