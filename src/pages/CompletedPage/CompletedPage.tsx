import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { ApiGetComicsParams, useLazyGetComicsQuery } from '~/apis/comicApis.ts';
import { DataFetching, InfiniteScrollPagination } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH, PAGINATION_INITIAL_PAGE } from '~/constants/commonConstants.ts';
import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import Title from '~/layouts/MenuLayout/components/MenuLayoutPageTitle.tsx';
import { Comic } from '~/types/comicType.ts';
import Content from './components/CompletedPageContent.tsx';

const PER_PAGE = 30;
const DEFAULT_GENRE = 'All';

function CompletedPage() {
  const isDesktop = useDeviceWatcher() === 'desktop';
  const [getComics, { isFetching: isApiFetching }] = useLazyGetComicsQuery();
  const [isDataFetching, setIsDataFetching] = useState(isApiFetching);
  const [comics, setComics] = useState<Comic[]>([]);
  const [genre, setGenre] = useState(DEFAULT_GENRE);
  const [getComicsParams, setGetComicsParams] = useState<ApiGetComicsParams>({
    status: ['completed'],
    _embed: 'cover_art',
    _limit: PER_PAGE,
    _page: PAGINATION_INITIAL_PAGE,
    _sort: {
      updatedAt: 'desc',
    },
  });

  // Handle page change
  const handleIntersect = async () => {
    if (comics.length < PER_PAGE) return;

    setGetComicsParams((prev) => ({
      ...prev,
      _page: prev._page! + 1,
    }));
  };

  // Handle genre change
  useEffect(() => {
    if (genre !== DEFAULT_GENRE) {
      setGetComicsParams((prev) => ({
        ...prev,
        _page: PAGINATION_INITIAL_PAGE,
        includedTags: [genre],
      }));
    } else {
      setGetComicsParams((prev) => {
        const { includedTags, ...rest } = prev;
        return {
          ...rest,
          _page: PAGINATION_INITIAL_PAGE,
        };
      });
    }
  }, [genre]);

  // Fetch comics
  useEffect(() => {
    (async () => {
      const newComics = await getComics(getComicsParams).unwrap();

      if (getComicsParams._page === PAGINATION_INITIAL_PAGE) {
        setComics(newComics);
      } else {
        setComics((prev) => [...prev, ...newComics]);
      }
    })();
  }, [getComicsParams]);

  // Handle data fetching state
  useEffect(() => {
    setIsDataFetching(true);
  }, [genre]);
  useEffect(() => {
    if (isDataFetching && !isApiFetching) setIsDataFetching(false);
  }, [isApiFetching]);

  return (
    <Container maxWidth={MUI_CONTAINER_MAX_WIDTH}>
      {isDesktop && (
        <Title onParamChange={setGenre} urlParam="category" defaultValue={DEFAULT_GENRE} />
      )}
      {isDataFetching ? <DataFetching /> : <Content items={comics} />}
      <InfiniteScrollPagination onIntersect={handleIntersect} />
      <Helmet>
        <title>Completed comics - Comic</title>
      </Helmet>
    </Container>
  );
}

export default CompletedPage;
