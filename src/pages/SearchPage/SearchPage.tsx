import { Container } from '@mui/material';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';

import { InfiniteScrollPagination } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { generateComics } from '~/database/comics.ts';
import Content from './components/SearchPageContent';
import NoSearchValue from './components/SearchPageNoValue';
import Title from './components/SearchPageTitle';

const comics = generateComics(10);

function SearchPage() {
  const [searchParam] = useSearchParams();
  const searchValue = searchParam.get('value');

  const handleIntersect = async () => {
    // TODO: Fetch next page
  };

  if (!searchValue) return <NoSearchValue />;

  return (
    <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} className="pt-8">
      <Title searchValue={searchValue} />
      <Content items={comics} />
      <InfiniteScrollPagination onIntersect={handleIntersect} />
      <Helmet>
        <title>{searchValue} - Comic</title>
      </Helmet>
    </Container>
  );
}

export default SearchPage;
