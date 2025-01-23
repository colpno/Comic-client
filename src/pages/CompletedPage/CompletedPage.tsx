import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { ApiGetComicsParams, useLazyGetComicsQuery } from '~/apis/comicApis.ts';
import { DataFetching, InfiniteScrollPagination } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH, PAGINATION_INITIAL_PAGE } from '~/constants/commonConstants.ts';
import { useDeviceWatcher, useInfinitePagination } from '~/hooks/index.ts';
import Title from '~/layouts/MenuLayout/components/MenuLayoutPageTitle.tsx';
import Content from './components/CompletedPageContent.tsx';

const PER_PAGE = 30;
const DEFAULT_GENRE = 'All';

const initialParams: ApiGetComicsParams = {
  status: ['completed'],
  _embed: 'cover_art',
  _limit: PER_PAGE,
  _page: PAGINATION_INITIAL_PAGE,
  _sort: {
    updatedAt: 'desc',
  },
};

function CompletedPage() {
  const [getComics, { isFetching, isLoading }] = useLazyGetComicsQuery();
  const {
    data: comics,
    setParams: setGetComicsParams,
    handleIntersect,
  } = useInfinitePagination([], initialParams, getComics);
  const isFetchingOrLoading = isFetching || isLoading;
  const isDesktop = useDeviceWatcher() === 'desktop';
  const [genre, setGenre] = useState(DEFAULT_GENRE);

  // Handle genre change
  useEffect(() => {
    // Has selected genre, then fetch comics by genre
    if (genre !== DEFAULT_GENRE) {
      setGetComicsParams(({ _page, ...prev }) => ({
        ...prev,
        includedTags: [genre],
      }));
    } else {
      // Or, fetch comics with any genre
      setGetComicsParams((prev) => {
        const { includedTags, _page, ...rest } = prev;
        return rest;
      });
    }
  }, [genre]);

  return (
    <Container maxWidth={MUI_CONTAINER_MAX_WIDTH}>
      {isDesktop && (
        <Title onParamChange={setGenre} urlParam="category" defaultValue={DEFAULT_GENRE} />
      )}
      {isFetchingOrLoading ? (
        <DataFetching />
      ) : (
        <>
          <Content items={comics} />
          <InfiniteScrollPagination onIntersect={handleIntersect} />
        </>
      )}
      <Helmet>
        <title>Completed comics - Comic</title>
      </Helmet>
    </Container>
  );
}

export default CompletedPage;
