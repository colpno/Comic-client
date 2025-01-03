import { Link } from 'react-router-dom';

import Image from '~/components/Image.tsx';
import Typography from '~/components/Typography.tsx';
import { getComicRoute } from '~/constants/routeConstants.ts';
import { placeholderImage } from '~/images/index.ts';
import { Comic } from '~/types/comicType.ts';

function SearchingComicCard(comic: Comic) {
  const tags = comic.tags.map((tag) => tag.name).join(', ');
  const authors = comic.authors.map((author) => author.name).join(', ');

  return (
    <Link to={getComicRoute(comic.title)} key={comic.id}>
      <figure className="flex gap-4">
        <Image
          src={placeholderImage}
          alt={comic.title}
          className="rounded-md aspect-[8/11] w-20 sm:w-24 md:w-28"
          onLoad={({ currentTarget }) => {
            currentTarget.src = comic.coverImageUrl;
          }}
          onError={({ currentTarget }) => {
            currentTarget.src = placeholderImage;
          }}
        />
        <div className="flex flex-col pt-4 pb-6 sm:pb-10 sm:pt-7">
          <Typography
            fontWeight={500}
            className="line-clamp-1"
            title={comic.title}
            component="figcaption"
          >
            {comic.title}
          </Typography>
          <Typography variant="body2" className="line-clamp-1 !mt-1 !mb-auto" title={tags}>
            {tags}
          </Typography>
          <Typography variant="body2" className="line-clamp-1" title={authors}>
            {authors}
          </Typography>
        </div>
      </figure>
    </Link>
  );
}

export default SearchingComicCard;
