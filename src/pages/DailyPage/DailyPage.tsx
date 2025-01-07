import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { InfiniteScrollPagination } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { generateComics } from '~/database/comics.ts';
import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import Title from '~/layouts/MenuLayout/components/MenuLayoutPageTitle.tsx';
import Content from './components/DailyPageContent';

const comics = generateComics(10);

function DailyPage() {
  const isDesktop = useDeviceWatcher() === 'desktop';

  const handleTitleChange = (value: string) => {
    // TODO: Fetch comics based on category
    console.log('value:', value);
  };

  const handleIntersect = async () => {
    // TODO: Fetch next page
  };

  return (
    <Container maxWidth={MUI_CONTAINER_MAX_WIDTH}>
      {isDesktop && <Title onParamChange={handleTitleChange} urlParam="weekday" />}
      <Content items={comics} />
      <InfiniteScrollPagination onIntersect={handleIntersect} />
      <Helmet>
        <title>Daily - Comic</title>
      </Helmet>
    </Container>
  );
}

export default DailyPage;
