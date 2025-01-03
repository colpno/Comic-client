import { Container } from '@mui/material';
import { FaArrowRight } from 'react-icons/fa6';
import { SwiperProps } from 'swiper/react';

import { Button } from '~/components/index.ts';
import Typography from '~/components/Typography.tsx';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { ROUTE_GENRES } from '~/constants/routeConstants.ts';
import { ComicCard, ComicHorizontalCard, ComicSlider } from '~/features/index.ts';
import { Comic } from '~/types/comicType.ts';

interface CardRowProps {
  title: string;
  items: Comic[];
  /** @default 5 */
  itemsPerGroup?: 2 | 4 | 5;
}
type Breakpoints = Record<
  Exclude<CardRowProps['itemsPerGroup'], undefined>,
  SwiperProps['breakpoints']
>;

function CardRow({ title, items, itemsPerGroup = 5 }: CardRowProps) {
  const genreUrl = `${ROUTE_GENRES}/${title.toLowerCase().replace(/\s/g, '-')}`;
  const breakpoints: Breakpoints = {
    2: {
      0: {
        slidesPerView: 1.1,
        slidesPerGroup: 1,
        scrollbar: true,
      },
      468: {
        slidesPerView: 1.8,
        slidesPerGroup: 1,
        scrollbar: true,
      },
      712: {
        slidesPerView: itemsPerGroup,
        slidesPerGroup: itemsPerGroup,
      },
    },
    4: {
      0: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        scrollbar: true,
      },
      468: {
        slidesPerView: 3.4,
        slidesPerGroup: 3,
        scrollbar: true,
      },
      712: {
        slidesPerView: itemsPerGroup,
        slidesPerGroup: itemsPerGroup,
      },
    },
    5: {
      0: {
        slidesPerView: 2.3,
        slidesPerGroup: 2,
        scrollbar: true,
      },
      468: {
        slidesPerView: 3.8,
        slidesPerGroup: 3,
        scrollbar: true,
      },
      712: {
        slidesPerView: itemsPerGroup,
        slidesPerGroup: itemsPerGroup,
      },
    },
  };

  return (
    <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h5" href={genreUrl} className="!font-semibold">
          {title}
        </Typography>
        <Button as="iconButton" href={genreUrl}>
          <FaArrowRight />
        </Button>
      </div>
      <ComicSlider
        spaceBetween={16}
        breakpoints={breakpoints[itemsPerGroup]}
        className="pb-4 overflow-x-scroll md:overflow-x-hidden md:pb-0"
      >
        {items.map((comic) =>
          itemsPerGroup === 2 ? (
            <ComicHorizontalCard {...comic} key={comic.id} />
          ) : (
            <ComicCard {...comic} key={comic.id} />
          )
        )}
      </ComicSlider>
    </Container>
  );
}

export default CardRow;
