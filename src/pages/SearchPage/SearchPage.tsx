import { Container } from '@mui/material';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import { ApiGetComicsParams, useLazyGetComicsQuery } from '~/apis/comicApis.ts';
import { DataFetching, InfiniteScrollPagination } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH, PAGINATION_INITIAL_PAGE } from '~/constants/commonConstants.ts';
import { useInfinitePagination } from '~/hooks/index.ts';
import Content from './components/SearchPageContent';
import NoSearchValue from './components/SearchPageNoValue';
import Title from './components/SearchPageTitle';

const PER_PAGE = 30;

const initialParams: ApiGetComicsParams = {
  _embed: 'cover_art',
  _limit: PER_PAGE,
  _page: PAGINATION_INITIAL_PAGE,
  _sort: {
    updatedAt: 'desc',
  },
};

function SearchPage() {
  const [getComics, { isFetching }] = useLazyGetComicsQuery();
  const {
    data: comics,
    setParams,
    handleIntersect,
  } = useInfinitePagination([], initialParams, getComics);
  const [searchParam] = useSearchParams();
  const searchValue = searchParam.get('value') || undefined;

  // Handle search value change
  useEffect(() => {
    if (searchValue && searchValue.length > 0) {
      setParams(({ _page, ...prev }) => ({
        ...prev,
        title: searchValue,
      }));
    }
  }, [searchValue]);

  if (!searchValue) return <NoSearchValue />;

  return (
    <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} className="pt-8">
      <Title searchValue={searchValue} />
      {isFetching ? <DataFetching /> : <Content items={comics} />}
      <InfiniteScrollPagination onIntersect={handleIntersect} />
      <Helmet>
        <title>{searchValue} - Comic</title>
      </Helmet>
    </Container>
  );
}

export default SearchPage;
