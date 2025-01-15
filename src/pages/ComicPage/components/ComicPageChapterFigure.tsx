import { Typography } from '~/components/index.ts';
import { Chapter } from '~/types/chapterType.ts';
import { toDate } from '~/utils/converters.ts';

interface Props {
  chapter: Pick<Chapter, 'id' | 'title' | 'chapter' | 'publishAt'>;
}

function ChapterFigure({ chapter }: Props) {
  const title = chapter.title
    ? `Ch.${chapter.chapter} - ${chapter.title}`
    : `Chapter ${chapter.chapter}`;

  return (
    <div className="flex gap-3 mt-4">
      <div className="items-start flex-1">
        <Typography variant="h6" title={title} className="line-clamp-1">
          {title}
        </Typography>
      </div>
      <div className="flex flex-col justify-between">
        <Typography variant="subtitle2" className="text-gray-500">
          {toDate(chapter.publishAt!)}
        </Typography>
      </div>
    </div>
  );
}

export default ChapterFigure;
