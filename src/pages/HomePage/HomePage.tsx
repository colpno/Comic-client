import { faker } from '@faker-js/faker';
import { Helmet } from 'react-helmet';

import { generateComics } from '~/database/comics.ts';
import BannerSlider from './components/HomePageBannerSlider.tsx';
import CardRow from './components/HomePageCardRow.tsx';
import Menu from './components/HomePageMenu.tsx';

const newComics = generateComics(10);

type ComicsByGenre = React.ComponentProps<typeof CardRow> & { id: string };
const comicsByGenre: ComicsByGenre[] = faker.helpers.multiple(
  () => ({
    items: generateComics(10),
    title: faker.commerce.productMaterial(),
    id: faker.database.mongodbObjectId(),
  }),
  { count: 7 }
);

function CardRowList() {
  comicsByGenre[2].itemsPerGroup = 4;
  comicsByGenre[3].itemsPerGroup = 2;
  comicsByGenre[5].itemsPerGroup = 4;

  return comicsByGenre.map(({ id, ...props }) => <CardRow key={id} {...props} />);
}

function HomePage() {
  return (
    <div>
      <BannerSlider items={newComics} />
      <Menu />
      <CardRowList />
      <Helmet>
        <title>Comic</title>
      </Helmet>
    </div>
  );
}

export default HomePage;
