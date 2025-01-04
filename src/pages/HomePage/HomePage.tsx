import { faker } from '@faker-js/faker';

import { generateComics } from '~/database/comics.ts';
import BannerSlider from './components/HomePageBannerSlider.tsx';
import CardRow from './components/HomePageCardRow.tsx';
import Menu from './components/HomePageMenu.tsx';

const newComics = generateComics(10);
const comicsByGenre: React.ComponentProps<typeof CardRow>[] = faker.helpers.multiple(
  () => ({
    items: generateComics(10),
    title: faker.commerce.productMaterial(),
  }),
  { count: 7 }
);

function CardRowList() {
  comicsByGenre[2].itemsPerGroup = 4;
  comicsByGenre[3].itemsPerGroup = 2;
  comicsByGenre[5].itemsPerGroup = 4;

  return comicsByGenre.map((props) => <CardRow {...props} />);
}

function HomePage() {
  return (
    <div>
      <BannerSlider items={newComics} />
      <Menu />
      <CardRowList />
    </div>
  );
}

export default HomePage;
