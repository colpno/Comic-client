import Image from '~/components/Image.tsx';
import { Comic } from '~/types/comicType.ts';

function ComicCoverCard(comic: Comic) {
  return (
    <figure>
      <Image src={comic.coverImageUrl} alt={comic.title} />
    </figure>
  );
}

export default ComicCoverCard;
