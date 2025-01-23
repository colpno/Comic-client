import { Container } from '@mui/material';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { useLazyGetComicsQuery } from '~/apis/comicApis.ts';
import { DataFetching, InfiniteScrollPagination } from '~/components/index.ts';
import Typography from '~/components/Typography.tsx';
import { MUI_CONTAINER_MAX_WIDTH, PAGINATION_INITIAL_PAGE } from '~/constants/commonConstants.ts';
import { useDeviceWatcher, useInfinitePagination } from '~/hooks/index.ts';
import { ApiGetComicsParams } from '~/types/index.ts';
import { toSentenceCase } from '~/utils/converters.ts';
import NotFoundPage from '../ErrorPage/components/NotFoundPage.tsx';
import Content from './components/ComicsByGenrePageContent.tsx';

const PER_PAGE = 30;

const initialParams: ApiGetComicsParams = {
  _embed: 'cover_art',
  _limit: PER_PAGE,
  _page: PAGINATION_INITIAL_PAGE,
};

function ComicsByGenrePage() {
  const [getComics, { isFetching, isLoading, isError }] = useLazyGetComicsQuery();
  const {
    data: comics,
    setParams,
    handleIntersect,
  } = useInfinitePagination([], initialParams, getComics);
  const isFetchingOrLoading = isFetching || isLoading;
  const isDesktop = useDeviceWatcher() === 'desktop';
  const { genre } = useParams();

  useEffect(() => {
    if (genre) {
      setParams(({ _page, ...prev }) => ({
        ...prev,
        includedTags: [genre],
      }));
    }
  }, [genre]);

  if (isError) {
    return <NotFoundPage title="No comics found" />;
  }

  return (
    <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} className="pt-8 pb-20">
      {isDesktop && genre && (
        <Typography component="h2" variant="h4" className="!mb-8 !text-3xl md:!text-4xl">
          {toSentenceCase(genre)}
        </Typography>
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
        <title>{genre} - Comic</title>
      </Helmet>
    </Container>
  );
}

export default ComicsByGenrePage;
