import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { InfiniteScrollPagination } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { generateComics } from '~/database/comics.ts';
import Content from './components/NewProductsPageContent.tsx';

const comics = generateComics(10);

function NewProductsPage() {
  const handleIntersect = async () => {
    // TODO: Fetch next page
  };

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
