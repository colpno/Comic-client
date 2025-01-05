import { Container } from '@mui/material';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { InfiniteScrollPagination } from '~/components/index.ts';
import Typography from '~/components/Typography.tsx';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { generateComics } from '~/database/comics.ts';
import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import { toSentenceCase } from '~/utils/converters.ts';
import Content from './components/ComicsByGenrePageContent.tsx';

const comics = generateComics(10);

function ComicsByGenrePage() {
  const isDesktop = useDeviceWatcher() === 'desktop';
  const { genre = '' } = useParams();

  const handleIntersect = async () => {
    // TODO: Fetch next page
  };

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
