import Image from '~/components/Image.tsx';
import Typography from '~/components/Typography.tsx';
import { placeholderImage } from '~/images/index.ts';
import { Comic } from '~/types/comicType.ts';

function ComicCard(comic: Comic) {
  return (
    <figure>
      <Image
        src={placeholderImage}
        alt={comic.title}
        className="rounded-md aspect-[8/11] w-full"
        onLoad={({ currentTarget }) => {
          currentTarget.src = comic.coverImageUrl;
        }}
        onError={({ currentTarget }) => {
          currentTarget.src = placeholderImage;
        }}
      />
      <figcaption className="mt-2">
        <Typography fontWeight={500} className="line-clamp-2" title={comic.title}>
          {comic.title}
        </Typography>
      </figcaption>
    </figure>
  );
}

export default ComicCard;
