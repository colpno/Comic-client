import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { useLazyGetComicsQuery } from '~/apis/comicApis.ts';
import { DataFetching, InfiniteScrollPagination } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH, PAGINATION_INITIAL_PAGE } from '~/constants/commonConstants.ts';
import { useInfinitePagination } from '~/hooks/index.ts';
import { ApiGetComicsParams } from '~/types/index.ts';
import NotFoundPage from '../ErrorPage/components/NotFoundPage.tsx';
import Content from './components/NewProductsPageContent.tsx';

const PER_PAGE = 30;

const initialParams: ApiGetComicsParams = {
  _embed: 'cover_art',
  _limit: PER_PAGE,
  _page: PAGINATION_INITIAL_PAGE,
  _sort: {
    createdAt: 'desc',
  },
};

function NewProductsPage() {
  const [getComics, { isFetching, isLoading, isError }] = useLazyGetComicsQuery();
  const { data: comics, handleIntersect } = useInfinitePagination([], initialParams, getComics);
  const isFetchingOrLoading = isFetching || isLoading;

  if (isError) {
    return <NotFoundPage title="No comics found" />;
  }

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
        <title>New comics - Comic</title>
      </Helmet>
    </Container>
  );
}

export default NewProductsPage;
