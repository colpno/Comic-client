import { Link, useParams } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { v4 } from 'uuid';

import Image from '~/components/Image.tsx';
import Typography from '~/components/Typography.tsx';
import { getComicReadingRoute } from '~/constants/routeConstants.ts';
import { PlaceholderImage } from '~/images/index.ts';
import { Chapter } from '~/types/chapterType.ts';
import { cn } from '~/utils/cssUtils.ts';
import ReadingPageSlider from './ReadingPageSlider.tsx';

interface Props {
  chapters: Pick<Chapter, 'content' | 'title' | 'chapter'>[];
}

function ReadingPagePagination({ chapters }: Props) {
  const { comicId } = useParams();

  if (!comicId) return null;

  return (
    <ReadingPageSlider>
      <div>
        {chapters.map(({ content, title, chapter: chapterNumber }) => (
          <SwiperSlide key={v4()}>
            {({ isActive }) => (
              <Link to={getComicReadingRoute(comicId, chapterNumber)}>
                <Image
                  lazy
                  src={content[0].dataSaver || content[0].data}
                  onLoad={({ currentTarget }) => (currentTarget.src = content[0].data)}
                  alt={title}
                  onError={({ currentTarget }) => {
                    currentTarget.src = PlaceholderImage;
                  }}
                  className={cn(
                    'w-full aspect-[8/11] rounded-md',
                    isActive && 'shadow-[0_0_10px_rgba(255,0,0,0.3)]'
                  )}
                />
                <Typography
                  className={cn('line-clamp-1', isActive && 'text-primary')}
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
