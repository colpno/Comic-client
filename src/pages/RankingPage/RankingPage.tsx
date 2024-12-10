import { Container } from '@mui/material';

import { InfiniteScrollPagination } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { generateComics } from '~/database/comics.ts';
import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import Content from './components/RankingPageContent.tsx';
import Title from './components/RankingPageTitle.tsx';

const comics = generateComics(10);

function RankingPage() {
  const isMobile = useDeviceWatcher() === 'mobile';

  return (
    <Container maxWidth={MUI_CONTAINER_MAX_WIDTH}>
      {!isMobile && <Title onCategoryChange={() => {}} />}
      <Content content={comics} />
      <InfiniteScrollPagination onIntersect={async () => {}} />
    </Container>
  );
}

export default RankingPage;
