import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import { ApiGetComicsParams, useLazyGetComicsQuery } from '~/apis/comicApis.ts';
import { DataFetching, InfiniteScrollPagination } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH, PAGINATION_INITIAL_PAGE } from '~/constants/commonConstants.ts';
import { Comic } from '~/types/comicType.ts';
import Content from './components/SearchPageContent';
import NoSearchValue from './components/SearchPageNoValue';
import Title from './components/SearchPageTitle';

const PER_PAGE = 30;

function SearchPage() {
  const [searchParam] = useSearchParams();
  const searchValue = searchParam.get('value') || undefined;
  const [searchComics, { isFetching: isApiFetching }] = useLazyGetComicsQuery();
  const [isDataFetching, setIsDataFetching] = useState(isApiFetching);
  const [comics, setComics] = useState<Comic[]>([]);
  const [getComicsParams, setGetComicsParams] = useState<Partial<ApiGetComicsParams>>({
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

  // Handle search value change
  useEffect(() => {
    setIsDataFetching(true);

    setGetComicsParams((prev) => ({
      ...prev,
      q: searchValue,
      _page: PAGINATION_INITIAL_PAGE,
    }));
  }, [searchValue]);

  // Fetch comics
  useEffect(() => {
    (async () => {
      const hasSearchValue = getComicsParams.title && getComicsParams.title.length > 0;
      if (hasSearchValue) {
        const newComics = await searchComics({
          ...getComicsParams,
          title: getComicsParams.title!,
        }).unwrap();

        const isFirstPage = getComicsParams._page === PAGINATION_INITIAL_PAGE;
        if (isFirstPage) {
          setComics(newComics);
          return;
        }

        setComics((prev) => [...prev, ...newComics]);
        return;
      }

      setComics([]);
    })();
  }, [getComicsParams]);

  // Handle data fetching state
  useEffect(() => {
    if (isDataFetching && !isApiFetching) setIsDataFetching(false);
  }, [isApiFetching]);

  if (!searchValue) return <NoSearchValue />;

  return (
    <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} className="pt-8">
      <Title searchValue={searchValue} />
      {isDataFetching ? <DataFetching /> : <Content items={comics} />}
      <InfiniteScrollPagination onIntersect={handleIntersect} />
      <Helmet>
        <title>{searchValue} - Comic</title>
      </Helmet>
    </Container>
  );
}

export default SearchPage;
