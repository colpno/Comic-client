import Image from '~/components/Image.tsx';
import Typography from '~/components/Typography.tsx';
import { PlaceholderImage } from '~/images/index.ts';
import { Comic } from '~/types/comicType.ts';

function ComicCard(comic: Comic) {
  return (
    <figure>
      <Image
        src={comic.coverImageUrl}
        alt={comic.title}
        className="rounded-md aspect-[8/11] w-full"
        onError={({ currentTarget }) => {
          currentTarget.src = PlaceholderImage;
        }}
      />
      <figcaption className="mt-2">
        <Typography fontWeight={500} className="line-clamp-1">
          {comic.title}
        </Typography>
      </figcaption>
    </figure>
  );
}

export default ComicCard;
