import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { v4 } from 'uuid';

import { useGetComicsQuery } from '~/apis/comicApis.ts';
import DataFetching from '~/components/DataFetching.tsx';
import { Comic } from '~/types/index.ts';
import NotFoundPage from '../ErrorPage/components/NotFoundPage.tsx';
import BannerSlider from './components/HomePageBanner.tsx';
import CardRow from './components/HomePageCardRow.tsx';
import GenreContainer from './components/HomePageGenreContainer.tsx';
import Menu from './components/HomePageMenu.tsx';

const genres = [
  'Reincarnation',
  'Action',
  'Drama',
  'Comedy',
  'Fantasy',
  'Sci-Fi',
  'Romance',
  'Historical',
  'Monsters',
  'Slice of Life',
];

const CARD_ROW_ITEM_LIMIT = 10;

type ComicsByGenre = React.ComponentProps<typeof CardRow> & { id: string };
type FilterComicsByGenre = (genres: string[], comics: Comic[]) => ComicsByGenre[];

const groupComicsByGenre: FilterComicsByGenre = (genres, comics) => {
  // Initialize
  const genreComics = genres.reduce((acc, genre) => {
    acc[genre] = [];
    return acc;
  }, {} as Record<string, Comic[]>);

  // Assign comics to genre
  comics.forEach((comic) => {
    comic.tags.some(({ name: tag }) => {
      if (genreComics[tag] && genreComics[tag].length < CARD_ROW_ITEM_LIMIT) {
        genreComics[tag].push(comic);
        return true;
      }
    });
  });

  // Convert object to array
  const comicsByGenre: ReturnType<FilterComicsByGenre> = Object.entries(genreComics).map(
    ([genre, comics]) => ({
      items: comics,
      title: genre,
      id: v4(),
    })
  );

  return comicsByGenre;
};

function HomePage() {
  const { data, isFetching, isLoading, isError } = useGetComicsQuery({
    _limit: 100,
    includedTags: genres,
    includedTagsMode: 'OR',
    _embed: 'cover_art',
  });
  const comics = data?.data || [];
  const [comicsByGenre, setComicsByGenre] = useState<ComicsByGenre[]>([]);

  // Filter comics by genre
  useEffect(() => {
    setComicsByGenre(groupComicsByGenre(genres, comics));
  }, [comics.length, setComicsByGenre]);

  if (isError) {
    return <NotFoundPage title="No comics found" />;
  }
  if (isFetching || isLoading || !(comics.length > 0 && comicsByGenre.length > 0)) {
    return <DataFetching />;
  }

  return (
    <div className="pb-16">
      <BannerSlider items={comics.slice(0, 10)} />
      <Menu />
      <CardRow {...comicsByGenre[0]} />
      <CardRow {...comicsByGenre[1]} />
      <CardRow {...comicsByGenre[2]} />
      <CardRow {...comicsByGenre[3]} itemsPerGroup={4} />
      <CardRow {...comicsByGenre[4]} itemsPerGroup={2} />
      <GenreContainer />
      <CardRow {...comicsByGenre[5]} itemsPerGroup={4} />
      <CardRow {...comicsByGenre[6]} />
      <CardRow {...comicsByGenre[7]} />
      <CardRow {...comicsByGenre[8]} />
      <CardRow {...comicsByGenre[9]} />
      <Helmet>
        <title>Comic</title>
      </Helmet>
    </div>
  );
}

export default HomePage;
