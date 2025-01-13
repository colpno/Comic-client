import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { useLazyGetComicsQuery } from '~/apis/comicApis.ts';
import { InfiniteScrollPagination } from '~/components/index.ts';
import Typography from '~/components/Typography.tsx';
import { MUI_CONTAINER_MAX_WIDTH, PAGINATION_INITIAL_PAGE } from '~/constants/commonConstants.ts';
import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import { Comic } from '~/types/comicType.ts';
import { toSentenceCase } from '~/utils/converters.ts';
import Content from './components/ComicsByGenrePageContent.tsx';

const PER_PAGE = 30;

function ComicsByGenrePage() {
  const isDesktop = useDeviceWatcher() === 'desktop';
  const [getComics] = useLazyGetComicsQuery();
  const [comics, setComics] = useState<Comic[]>([]);
  const [page, setPage] = useState(PAGINATION_INITIAL_PAGE);
  const { genre = '' } = useParams();

  const handleIntersect = async () => {
    if (comics.length < PER_PAGE) return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    (async () => {
      const newComics = await getComics({
        includedTags: [genre],
        _embed: 'cover_art',
        _limit: PER_PAGE,
        _page: page,
      }).unwrap();

      if (page === PAGINATION_INITIAL_PAGE) {
        setComics(newComics);
      } else {
        setComics((prev) => [...prev, ...newComics]);
      }
    })();
  }, [genre, page]);

  return (
    <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} className="pt-8 pb-20">
      {isDesktop && (
        <Typography component="h2" variant="h4" className="!mb-8 !text-3xl md:!text-4xl">
          {toSentenceCase(genre)}
        </Typography>
      )}
      <Content items={comics} />
      <InfiniteScrollPagination onIntersect={handleIntersect} />
      <Helmet>
        <title>{genre} - Comic</title>
      </Helmet>
    </Container>
  );
}

export default ComicsByGenrePage;
