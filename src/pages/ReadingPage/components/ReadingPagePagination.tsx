import { Link, useParams } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { v4 } from 'uuid';

import Typography from '~/components/Typography.tsx';
import { getComicReadingRoute } from '~/constants/routeConstants.ts';
import { Chapter } from '~/types/index.ts';
import { cn } from '~/utils/cssUtils.ts';
import ReadingPageSlider from './ReadingPageSlider.tsx';

interface Props {
  chapters: Pick<Chapter, 'title' | 'chapter'>[];
}

function ReadingPagePagination({ chapters }: Props) {
  const { comictitle } = useParams();

  if (!comictitle) return null;

  return (
    <ReadingPageSlider>
      <div>
        {chapters.map(({ title, chapter: chapterNumber }) => (
          <SwiperSlide key={v4()}>
            {({ isActive }) => (
              <Link to={getComicReadingRoute(comictitle, chapterNumber)}>
                <Typography
                  className={cn('line-clamp-1', isActive && 'text-primary-500')}
                  title={`Ch.${chapterNumber}: ${title}`}
                >
                  Ch.{chapterNumber}: {title}
                </Typography>
              </Link>
            )}
          </SwiperSlide>
        ))}
      </div>
    </ReadingPageSlider>
  );
}

export default ReadingPagePagination;
