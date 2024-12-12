import { SearchingComicCard } from '~/features/index.ts';
import { Comic } from '~/types/comicType.ts';

interface Props {
  items: Comic[];
}

function SearchPageContent({ items }: Props) {
  return (
    <section className="flex flex-col gap-4">
      {items.map((comic) => (
        <SearchingComicCard key={comic.id} {...comic} />
      ))}
    </section>
  );
}

export default SearchPageContent;
