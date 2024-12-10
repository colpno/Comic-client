import Image from '~/components/Image.tsx';
import Typography from '~/components/Typography.tsx';
import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import { PlaceholderImage } from '~/images/index.ts';
import { Comic } from '~/types/comicType.ts';

function NewArrivalsComicCard(comic: Comic) {
  const isMobile = useDeviceWatcher() === 'mobile';

  if (isMobile) {
    return <MobileCard {...comic} />;
  }

  return (
    <figure>
      <Image
        src={PlaceholderImage}
        alt={comic.title}
        className="rounded-md aspect-[8/11] w-full"
        onLoad={({ currentTarget }) => {
          currentTarget.src = comic.coverImageUrl;
        }}
        onError={({ currentTarget }) => {
          currentTarget.src = PlaceholderImage;
        }}
      />
      <figcaption>
        <Typography fontWeight={500} className="line-clamp-2" title={comic.title}>
          {comic.title}
        </Typography>
      </figcaption>
    </figure>
  );
}

export default NewArrivalsComicCard;

function MobileCard(comic: Comic) {
  return (
    <figure className="flex gap-3">
      <Image
        src={PlaceholderImage}
        alt={comic.title}
        className="rounded-md aspect-[8/11] w-20"
        onLoad={({ currentTarget }) => {
          currentTarget.src = comic.coverImageUrl;
        }}
        onError={({ currentTarget }) => {
          currentTarget.src = PlaceholderImage;
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
        <Typography
          variant="body2"
          className="!text-disabled !text-xs sm:!text-sm line-clamp-1 !mt-1 !mb-auto"
        >
          {comic.tags.map((tag) => tag.name).join(', ')}
        </Typography>
        <Typography variant="body2" className="!text-disabled !text-xs sm:!text-sm line-clamp-1">
          {comic.authors.map((author) => author.name).join(', ')}
        </Typography>
      </div>
    </figure>
  );
}
