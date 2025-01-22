import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { useLazyGetComicsQuery } from '~/apis/comicApis.ts';
import { InfiniteScrollPagination } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH, PAGINATION_INITIAL_PAGE } from '~/constants/commonConstants.ts';
import { Comic } from '~/types/index.ts';
import Content from './components/NewProductsPageContent.tsx';

const PER_PAGE = 30;

function NewProductsPage() {
  const [getComics] = useLazyGetComicsQuery();
  const [comics, setComics] = useState<Comic[]>([]);
  const [page, setPage] = useState(PAGINATION_INITIAL_PAGE);

  const handleIntersect = async () => {
    if (comics.length < PER_PAGE) return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    (async () => {
      const data = await getComics({
        _embed: 'cover_art',
        _limit: PER_PAGE,
        _page: page,
        _sort: {
          createdAt: 'desc',
        },
      }).unwrap();
      const newComics = data.data;

      if (page === PAGINATION_INITIAL_PAGE) {
        setComics(newComics);
      } else {
        setComics((prev) => [...prev, ...newComics]);
      }
    })();
  }, [page]);

  return (
    <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} className="-mt-8">
      <Content items={comics} />
      <InfiniteScrollPagination onIntersect={handleIntersect} />
      <Helmet>
        <title>New comics - Comic</title>
      </Helmet>
    </Container>
  );
}

export default NewProductsPage;
