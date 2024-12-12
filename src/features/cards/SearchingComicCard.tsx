import Image from '~/components/Image.tsx';
import Typography from '~/components/Typography.tsx';
import { PlaceholderImage } from '~/images/index.ts';
import { Comic } from '~/types/comicType.ts';

function SearchingComicCard(comic: Comic) {
  const tags = comic.tags.map((tag) => tag.name).join(', ');
  const authors = comic.authors.map((author) => author.name).join(', ');

  return (
    <figure className="flex gap-4">
      <Image
        src={PlaceholderImage}
        alt={comic.title}
        className="rounded-md aspect-[8/11] w-28"
        onLoad={({ currentTarget }) => {
          currentTarget.src = comic.coverImageUrl;
        }}
        onError={({ currentTarget }) => {
          currentTarget.src = PlaceholderImage;
        }}
      />
      <div className="flex flex-col pb-10 pt-7">
        <Typography
          fontWeight={500}
          className="line-clamp-1"
          title={comic.title}
          component="figcaption"
        >
          {comic.title}
        </Typography>
        <Typography
          variant="body2"
          className="!text-disabled !text-xs sm:!text-sm line-clamp-1 !mt-1 !mb-auto"
          title={tags}
        >
          {tags}
        </Typography>
        <Typography
          variant="body2"
          className="!text-disabled !text-xs sm:!text-sm line-clamp-1"
          title={authors}
        >
          {authors}
        </Typography>
      </div>
    </figure>
  );
}

export default SearchingComicCard;
