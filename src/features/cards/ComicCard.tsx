import Image from '~/components/Image.tsx';
import Typography from '~/components/Typography.tsx';
import { Comic } from '~/types/comicType.ts';

function ComicCard(comic: Comic) {
  return (
    <figure>
      <Image src={comic.coverImageUrl} alt={comic.title} className="rounded-md" />
      <figcaption className="mt-2">
        <Typography fontWeight={500} className="line-clamp-1">
          {comic.title}
        </Typography>
      </figcaption>
    </figure>
  );
}

export default ComicCard;
