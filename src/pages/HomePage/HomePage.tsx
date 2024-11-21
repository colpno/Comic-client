import { generateComics } from '~/database/comics.ts';
import BannerSlider from './components/HomePageBannerSlider.tsx';
import CardRow from './components/HomePageCardRow.tsx';
import Menu from './components/HomePageMenu.tsx';

const comics = generateComics(10);

function HomePage() {
  return (
    <div>
      <BannerSlider bannerUrls={comics.map((c) => c.coverImageUrl)} />
      <Menu />
      <CardRow title="Genre 1" items={comics} />
      <CardRow title="Genre 1" items={comics} />
      <CardRow title="Genre 1" items={comics} itemsPerGroup={4} />
      <CardRow title="Genre 1" items={comics} itemsPerGroup={2} />
      <CardRow title="Genre 1" items={comics} />
      <CardRow title="Genre 1" items={comics} itemsPerGroup={4} />
      <CardRow title="Genre 1" items={comics} />
    </div>
  );
}

export default HomePage;
