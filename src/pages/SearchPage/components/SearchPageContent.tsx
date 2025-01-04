import Image from '~/components/Image.tsx';
import { Typography } from '~/components/index.ts';
import { SearchingComicCard } from '~/features/index.ts';
import { noSearchSVG } from '~/images/index.ts';
import { Comic } from '~/types/comicType.ts';

interface Props {
  items: Comic[];
}

function SearchPageContent({ items }: Props) {
  if (items.length === 0) {
    return (
      <div>
        <Image src={noSearchSVG} alt="No search result" className="mx-auto mt-12" />
        <Typography textAlign="center" variant="h6">
          No search results...
        </Typography>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {items.map((comic) => (
        <SearchingComicCard key={comic.id} {...comic} />
      ))}
    </section>
  );
}

export default SearchPageContent;
