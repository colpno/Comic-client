import { Link } from 'react-router-dom';

import { Pagination as AppPagination, Typography } from '~/components/index.ts';
import { getComicReadingRoute } from '~/constants/routeConstants.ts';
import { Chapter as ChapterType } from '~/types/chapterType.ts';
import { Comic } from '~/types/comicType.ts';
import { toDate } from '~/utils/converters.ts';

interface ChapterProps {
  comicId: Comic['id'];
  chapter: Pick<ChapterType, 'id' | 'content' | 'title' | 'chapter' | 'publishAt'>;
}

function Chapter({ comicId, chapter }: ChapterProps) {
  return (
    <Link to={getComicReadingRoute(comicId, chapter.chapter)} key={chapter.id}>
      <div className="flex gap-3 mt-4">
        <div
          style={{
            backgroundImage: `url(${chapter.content[0].data})`,
          }}
          className="w-[60px] h-[80px] bg-center bg-cover shadow-[2px_1px_2px_0px_rgba(0,0,0,0.2)]"
        />
        <div className="items-start flex-1">
          <Typography variant="h6" title={chapter.title} className="line-clamp-1">
            {chapter.title}
          </Typography>
        </div>
        <div className="flex flex-col justify-between">
          <Typography variant="subtitle2" className="text-gray-500 text-end">
            #{chapter.chapter}
          </Typography>
          <Typography variant="subtitle2" className="text-gray-500">
            {toDate(chapter.publishAt!)}
          </Typography>
        </div>
      </div>
    </Link>
  );
}

function Pagination({ totalPages }: { totalPages: number }) {
  return (
    <div className="flex items-center justify-center mb-6">
      <AppPagination pageCount={totalPages} />
    </div>
  );
}

interface Props {
  comic: Comic;
  chapters: ChapterType[];
}

function ComicPageChapterList({ comic, chapters }: Props) {
  return (
    <>
      <Typography variant="h5" className="!mb-6">
        {chapters.length} chapters
      </Typography>
      <Pagination totalPages={chapters.length} />
      <div>
        {chapters.map((chapter) => (
          <Chapter comicId={comic.id} chapter={chapter} />
        ))}
      </div>
      <Pagination totalPages={chapters.length} />
    </>
  );
}

export default ComicPageChapterList;
