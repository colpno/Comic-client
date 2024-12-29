import Image from '~/components/Image.tsx';
import { Button } from '~/components/index.ts';
import Typography from '~/components/Typography.tsx';
import { getComicReadingRoute, getComicRoute } from '~/constants/routeConstants.ts';
import { placeholderImage } from '~/images/index.ts';
import { Chapter } from '~/types/chapterType.ts';
import { Comic } from '~/types/comicType.ts';
import { History } from '~/types/historyType.ts';
import { toDate } from '~/utils/converters.ts';

interface Props {
  history: History<Comic, Chapter>;
  onRemove: () => void;
}

function HistoryComicCard({ history, onRemove }: Props) {
  const { comic, chapter } = history;
  const authors = comic.authors.map((author) => author.name).join(', ');
  const readAt = `Read Ch.${chapter.chapter} at ${toDate(history.readAt, 'YYYY/MM/DD LT')}`;

  return (
    <figure className="grid grid-cols-[5rem,1fr] sm:flex gap-x-4 gap-y-2 sm:gap-4">
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
      <div className="flex flex-col w-full pt-4 pb-6 sm:pb-6 sm:pt-5">
        <Typography
          fontWeight={500}
          className="line-clamp-1 hover:text-primary-500"
          title={comic.title}
          component="figcaption"
          href={getComicRoute(comic.id)}
        >
          {comic.title}
        </Typography>
        <Typography
          variant="body2"
          className="!text-disabled !text-xs sm:!text-sm line-clamp-1 !mt-1 !mb-auto"
        >
          {authors}
        </Typography>
        <Typography variant="body2" className="!text-disabled !text-xs sm:!text-sm line-clamp-1">
          {readAt}
        </Typography>
      </div>
      <Actions comic={comic} chapter={chapter} onRemove={onRemove} />
    </figure>
  );
}

export default HistoryComicCard;

interface ActionsProps {
  comic: Comic;
  chapter: Chapter;
  onRemove: Props['onRemove'];
}

function Actions({ comic, chapter, onRemove }: ActionsProps) {
  return (
    <div className="flex col-span-2 gap-2 sm:py-1 sm:flex-col">
      <Button
        fullWidth
        disableGutter
        disabled={!comic.latestUploadedChapter || comic.latestUploadedChapter <= chapter.chapter}
        href={getComicReadingRoute(
          comic.id,
          comic.latestUploadedChapter && comic.latestUploadedChapter > chapter.chapter
            ? chapter.chapter + 1
            : 0
        )}
      >
        Continue
      </Button>
      <Button variant="outlined" disableGutter fullWidth onClick={onRemove}>
        Remove
      </Button>
    </div>
  );
}
