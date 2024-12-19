import { Container } from '@mui/material';

import { InfiniteScrollPagination } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { generateComics } from '~/database/comics.ts';
import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import Title from '~/layouts/MenuLayout/components/MenuLayoutPageTitle.tsx';
import Content from './components/CompletedPageContent.tsx';

const comics = generateComics(10);

function CompletedPage() {
  const isDesktop = useDeviceWatcher() === 'desktop';

  const handleTitleChange = (value: string) => {
    // TODO: Fetch comics based on category
  };

  const handleIntersect = async () => {
    // TODO: Fetch next page
  };

  return (
    <Container maxWidth={MUI_CONTAINER_MAX_WIDTH}>
      {isDesktop && (
        <Title onParamChange={handleTitleChange} urlParam="category" defaultValue="All" />
      )}
      <Content items={comics} />
      <InfiniteScrollPagination onIntersect={handleIntersect} />
    </Container>
  );
}

export default CompletedPage;
