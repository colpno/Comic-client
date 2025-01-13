import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { useLazyGetComicsQuery } from '~/apis/comicApis.ts';
import { DataFetching, InfiniteScrollPagination } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH, PAGINATION_INITIAL_PAGE } from '~/constants/commonConstants.ts';
import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import Title from '~/layouts/MenuLayout/components/MenuLayoutPageTitle.tsx';
import { ApiGetComicsParams } from '~/types/apis/comicApiTypes.ts';
import { Comic } from '~/types/comicType.ts';
import Content from './components/RankingPageContent.tsx';

const PER_PAGE = 30;
const DEFAULT_GENRE = 'All';

function RankingPage() {
  const isDesktop = useDeviceWatcher() === 'desktop';
  const [getComics, { isFetching: isApiFetching }] = useLazyGetComicsQuery();
  const [isDataFetching, setIsDataFetching] = useState(isApiFetching);
  const [comics, setComics] = useState<Comic[]>([]);
  const [getComicsParams, setGetComicsParams] = useState<ApiGetComicsParams>({
    _embed: 'cover_art',
    _limit: PER_PAGE,
    _page: PAGINATION_INITIAL_PAGE,
    _sort: {
      rating: 'desc',
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

  const handleGenreChange = (genre: string) => {
    setIsDataFetching(true);

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
  };

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
    if (isDataFetching && !isApiFetching) setIsDataFetching(false);
  }, [isApiFetching]);

  return (
    <Container maxWidth={MUI_CONTAINER_MAX_WIDTH}>
      {isDesktop && (
        <Title onParamChange={handleGenreChange} urlParam="category" defaultValue={DEFAULT_GENRE} />
      )}
      {isDataFetching ? <DataFetching /> : <Content items={comics} />}
      <InfiniteScrollPagination onIntersect={handleIntersect} />
      <Helmet>
        <title>Ranking - Comic</title>
      </Helmet>
    </Container>
  );
}

export default RankingPage;
