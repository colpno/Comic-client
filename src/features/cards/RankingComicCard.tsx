import Image from '~/components/Image.tsx';
import Typography from '~/components/Typography.tsx';
import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import { placeholderImage } from '~/images/index.ts';
import { Comic } from '~/types/comicType.ts';

interface Props {
  comic: Comic;
  rank: number;
}

function RankingComicCard({ comic, rank }: Props) {
  const isMobile = useDeviceWatcher() === 'mobile';

  if (isMobile) {
    return <MobileCard comic={comic} rank={rank} />;
  }

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
      <Typography
        variant="h5"
        className="!mt-2 italic font-extrabold line-clamp-1"
        title={`${rank}`}
      >
        {rank}
      </Typography>
      <figcaption>
        <Typography fontWeight={500} className="line-clamp-2" title={comic.title}>
          {comic.title}
        </Typography>
      </figcaption>
    </figure>
  );
}

export default RankingComicCard;

function MobileCard({ comic, rank }: Props) {
  return (
    <figure className="flex gap-3">
      <Image
        src={placeholderImage}
        alt={comic.title}
        className="rounded-md aspect-[8/11] w-20"
        onLoad={({ currentTarget }) => {
          currentTarget.src = comic.coverImageUrl;
        }}
        onError={({ currentTarget }) => {
          currentTarget.src = placeholderImage;
        }}
      />
      <div className="flex flex-col">
        <Typography variant="h5" className="italic font-extrabold line-clamp-1" title={`${rank}`}>
          {rank}
        </Typography>
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
        <Typography variant="body2" className="line-clamp-1">
          {comic.authors.map((author) => author.name).join(', ')}
        </Typography>
      </div>
    </figure>
  );
}
