import { Link } from 'react-router-dom';

import Typography from '~/components/Typography.tsx';
import { getComicRoute } from '~/constants/routeConstants.ts';
import { Comic } from '~/types/index.ts';

function ComicHorizontalCard(comic: Comic) {
  return (
    <Link to={getComicRoute(comic.title)} key={comic.id}>
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
    </Link>
  );
}

export default ComicHorizontalCard;
