import React, { useEffect, useMemo, useState } from 'react';

import { useGetChaptersQuery } from '~/apis/chapterApis.ts';
import {
  DataFetching,
  Image,
  Pagination as AppPagination,
  Typography,
} from '~/components/index.ts';
import { PAGINATION_INITIAL_PAGE } from '~/constants/commonConstants.ts';
import { noDataSVG } from '~/images/index.ts';
import { Chapter, Comic } from '~/types/index.ts';
import ComicPageChapterList from './ComicPageChapterList.tsx';

function Pagination(props: React.ComponentProps<typeof AppPagination>) {
  return (
    <div className="flex items-center justify-center">
      <AppPagination {...props} />
    </div>
  );
}

type Volume = React.ComponentProps<typeof ComicPageChapterList>['data'][number];

const groupChaptersByVol = (chapters: Chapter[]) => {
  return chapters.reduce((acc, chapter) => {
    const volume = chapter.volume || 'Other';
    if (!acc[volume]) {
      acc[volume] = [];
    }
    acc[volume].push(chapter);
    return acc;
  }, {} as Record<string, Chapter[]>);
};

function ComicPageChapterSection(comic: Comic) {
  const [page, setPage] = useState(PAGINATION_INITIAL_PAGE);
  const { data, isFetching, isLoading } = useGetChaptersQuery({
    comicId: comic.id,
    _limit: 100,
    _page: page,
    _sort: {
      chapter: 'desc',
    },
  });
  const chapters = data?.data || [];
  const pagination = data?.metadata?.pagination;
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const groupedChapters = useMemo(() => groupChaptersByVol(chapters), [chapters]);

  // Reverse the order of volumes
  useEffect(() => {
    const vols: typeof volumes = [];
    const volumeKeys = Object.keys(groupedChapters);

    for (let i = volumeKeys.length - 1; i >= 0; i--) {
      const volume = volumeKeys[i];
      const chapters = groupedChapters[volume];
      vols.push({ volume, chapters });
    }

    setVolumes(vols);
  }, [groupedChapters]);

  if (isFetching || isLoading) {
    return <DataFetching />;
  }
  if (chapters.length === 0 || !pagination) {
    return <Image src={noDataSVG} alt="No chapters" />;
  }

  return (
    <>
      <Typography variant="h5" className="!mb-6">
        {pagination.totalItems} chapters
      </Typography>
      <Pagination pageCount={pagination.totalPages} onChange={setPage} />
      <ComicPageChapterList data={volumes} />
      <Pagination pageCount={pagination.totalPages} onChange={setPage} />
    </>
  );
}

export default ComicPageChapterSection;
