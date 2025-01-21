import React, { useEffect, useState } from 'react';

import { useLazyGetChaptersQuery } from '~/apis/chapterApis.ts';
import {
  DataFetching,
  Image,
  Pagination as AppPagination,
  Typography,
} from '~/components/index.ts';
import { PAGINATION_INITIAL_PAGE } from '~/constants/commonConstants.ts';
import { noDataSVG } from '~/images/index.ts';
import { ApiPaginatedResponse } from '~/types/apiTypes.ts';
import { Chapter } from '~/types/chapterType.ts';
import { Comic } from '~/types/comicType.ts';
import ComicPageChapterList from './ComicPageChapterList.tsx';

function Pagination(props: React.ComponentProps<typeof AppPagination>) {
  return (
    <div className="flex items-center justify-center">
      <AppPagination {...props} />
    </div>
  );
}

interface Props {
  comic: Comic;
}

function ComicPageChapterSection({ comic }: Props) {
  const [getChapters, { data, isFetching, isLoading }] = useLazyGetChaptersQuery();
  const [page, setPage] = useState(PAGINATION_INITIAL_PAGE);
  const getChaptersData = (data || {
    data: [],
    metadata: { pagination: { totalItems: 0, totalPages: 0 } },
  }) as ApiPaginatedResponse<Chapter[]>;
  const { data: chapters, metadata } = getChaptersData;
  const { pagination } = metadata!;

  // Fetch chapters
  useEffect(() => {
    if (comic) {
      getChapters({
        comicId: comic.id,
        _limit: 100,
        _page: page,
        _sort: {
          volume: 'desc',
          chapter: 'desc',
        },
      });
    }
  }, [comic, page]);

  if (isFetching || isLoading) {
    return <DataFetching />;
  }

  if (chapters.length === 0) {
    return <Image src={noDataSVG} alt="No chapters" />;
  }

  return (
    <>
      <Typography variant="h5" className="!mb-6">
        {pagination!.totalItems} chapters
      </Typography>
      <Pagination pageCount={pagination!.totalPages} onChange={setPage} />
      <ComicPageChapterList chapters={chapters} />
      <Pagination pageCount={pagination!.totalPages} onChange={setPage} />
    </>
  );
}

export default ComicPageChapterSection;
