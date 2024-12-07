import Typography from '~/components/Typography.tsx';
import { Comic } from '~/types/comicType.ts';

function ComicHorizontalCard(comic: Comic) {
  return (
    <figure>
      <div
        className="object-cover w-full bg-center bg-cover rounded-md aspect-video"
        style={{ backgroundImage: `url(${comic.coverImageUrl})` }}
      />
      <figcaption className="mt-2">
        <Typography variant="body1" fontWeight={500} className="line-clamp-1" title={comic.title}>
          {comic.title}
        </Typography>
      </figcaption>
    </figure>
  );
}

export default ComicHorizontalCard;
