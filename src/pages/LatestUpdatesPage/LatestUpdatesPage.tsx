import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { ApiGetComicsParams, useLazyGetComicsQuery } from '~/apis/comicApis.ts';
import { DataFetching, InfiniteScrollPagination } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH, PAGINATION_INITIAL_PAGE } from '~/constants/commonConstants.ts';
import { useInfinitePagination } from '~/hooks/index.ts';
import Content from './components/LatestUpdatesPageContent';

const PER_PAGE = 30;

const initialParams: ApiGetComicsParams = {
  _embed: 'cover_art',
  _limit: PER_PAGE,
  _page: PAGINATION_INITIAL_PAGE,
  _sort: {
    updatedAt: 'desc',
  },
};

function LatestUpdatesPage() {
  const [getComics, { isFetching, isLoading }] = useLazyGetComicsQuery();
  const { data: comics, handleIntersect } = useInfinitePagination([], initialParams, getComics);
  const isFetchingOrLoading = isFetching || isLoading;

  return (
    <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} className="-mt-8">
      {isFetchingOrLoading ? (
        <DataFetching />
      ) : (
        <>
          <Content items={comics} />
          <InfiniteScrollPagination onIntersect={handleIntersect} />
        </>
      )}
      <Helmet>
        <title>Latest updates - Comic</title>
      </Helmet>
    </Container>
  );
}

export default LatestUpdatesPage;
