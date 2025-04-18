import { Link } from 'react-router-dom';

import Image from '~/components/Image.tsx';
import Typography from '~/components/Typography.tsx';
import { getComicRoute } from '~/constants/routeConstants.ts';
import { useDeviceWatcher } from '~/hooks/index.ts';
import { placeholderImage } from '~/images/index.ts';
import { Comic } from '~/types/index.ts';

function NewArrivalsComicCard(comic: Comic) {
  const isMobile = useDeviceWatcher() === 'mobile';

  if (isMobile) {
    return <MobileCard {...comic} />;
  }

  return (
    <Link to={getComicRoute(comic.title)} key={comic.id}>
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
        <figcaption>
          <Typography fontWeight={500} className="line-clamp-2" title={comic.title}>
            {comic.title}
          </Typography>
        </figcaption>
      </figure>
    </Link>
  );
}

export default NewArrivalsComicCard;

function MobileCard(comic: Comic) {
  return (
    <figure className="flex gap-3">
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
      <div className="flex flex-col py-2 pb-4">
        <Typography
          fontWeight={500}
          className="line-clamp-2"
          title={comic.title}
          component="figcaption"
        >
          {comic.title}
        </Typography>
        <Typography variant="body2" className="line-clamp-1 !mt-1 !mb-auto">
          {comic.tags.map((tag) => tag.name).join(', ')}
        </Typography>
        {comic.authors && (
          <Typography variant="body2" className="line-clamp-1">
            {comic.authors.map((author) => author.name).join(', ')}
          </Typography>
        )}
      </div>
    </figure>
  );
}
