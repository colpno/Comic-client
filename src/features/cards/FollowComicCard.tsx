import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Image from '~/components/Image.tsx';
import { Button } from '~/components/index.ts';
import Typography from '~/components/Typography.tsx';
import { getComicRoute } from '~/constants/routeConstants.ts';
import { placeholderImage } from '~/images/index.ts';
import { Comic } from '~/types/comicType.ts';
import { toDate } from '~/utils/converters.ts';

interface Props {
  item: Comic;
  onRemove: () => void;
}

function FollowComicCard({ item, onRemove }: Props) {
  const authors = item.authors.map((author) => author.name).join(', ');
  const createdAt = `Added at ${toDate(item.createdAt, 'MM/DD/YYYY, LT')}`;

  return (
    <figure className="grid grid-cols-[5rem,1fr,2rem] sm:flex gap-x-1 sm:gap-x-3 md:gap-x-4 gap-y-2 sm:gap-4">
      <Link to={getComicRoute(item.title)}>
        <Image
          src={placeholderImage}
          alt={item.title}
          className="rounded-md aspect-[8/11] w-16 sm:w-20 md:w-24"
          onLoad={({ currentTarget }) => {
            currentTarget.src = item.coverImageUrl;
          }}
          onError={({ currentTarget }) => {
            currentTarget.src = placeholderImage;
          }}
        />
      </Link>
      <Link
        to={getComicRoute(item.title)}
        className="flex flex-col w-full pt-3 pb-3 sm:pb-3 sm:pt-2"
      >
        <Typography
          fontWeight={500}
          className="line-clamp-1"
          title={item.title}
          component="figcaption"
        >
          {item.title}
        </Typography>
        <Typography variant="body2" className="line-clamp-1 md:!mt-1 !mb-auto !text-disabled">
          {authors}
        </Typography>
        <Typography variant="body2" className="line-clamp-1 !text-disabled">
          {createdAt}
        </Typography>
      </Link>
      <div className="flex items-center justify-center">
        <Button as="iconButton" onClick={onRemove} size="small" className="!bg-red-500 !text-white">
          <MdClose />
        </Button>
      </div>
    </figure>
  );
}

export default FollowComicCard;
export { type Props as FollowComicCardProps };
