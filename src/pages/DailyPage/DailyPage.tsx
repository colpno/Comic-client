import { Container } from '@mui/material';

import { InfiniteScrollPagination } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { generateComics } from '~/database/comics.ts';
import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import Title from '~/layouts/MenuLayout/components/MenuLayoutPageTitle.tsx';
import Content from './components/DailyPageContent';

const comics = generateComics(10);

function DailyPage() {
  const isDesktop = useDeviceWatcher() === 'desktop';

  return (
    <Container maxWidth={MUI_CONTAINER_MAX_WIDTH}>
      {isDesktop && <Title onParamChange={() => {}} urlParam="weekday" />}
      <Content items={comics} />
      <InfiniteScrollPagination onIntersect={async () => {}} />
    </Container>
  );
}

export default DailyPage;
