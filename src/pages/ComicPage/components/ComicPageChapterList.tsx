import { Link, useParams } from 'react-router-dom';

import { getComicReadingRoute } from '~/constants/routeConstants.ts';
import { Chapter } from '~/types/index.ts';
import ChapterFigure from './ComicPageChapterFigure.tsx';

interface Props {
  data: Chapter[];
}

function ComicPageChapterList({ data }: Props) {
  const { comictitle } = useParams();

  return data.map((chapter) => (
    <Link to={getComicReadingRoute(comictitle, chapter.chapter)} key={chapter.id}>
      <ChapterFigure key={chapter.id} chapter={chapter} />
    </Link>
  ));
}

export default ComicPageChapterList;
