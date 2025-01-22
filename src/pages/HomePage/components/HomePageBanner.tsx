import { Container } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SwiperClass } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import { Slider, Typography } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { getComicRoute } from '~/constants/routeConstants.ts';
import { Comic } from '~/types/index.ts';
import Pagination from './HomePageBannerPagination.tsx';

interface Props {
  items: Comic[];
}

const SLIDE_CHANGE_TIME = 10000; // 10s

function HomePageBanner({ items }: Props) {
  const [Swiper, setSwiper] = useState<null | SwiperClass>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentItem = items[currentSlideIndex];
  const title = currentItem.title;
  const description = currentItem.description;

  const setCurrSlideIndex = (swiper: SwiperType) => setCurrentSlideIndex(swiper.activeIndex);

  return (
    <div className="relative overflow-hidden h-banner-home flex flex-col items-center justify-center before:absolute before:top-0 before:w-full before:h-24 before:bg-gradient-to-t before:from-transparent before:to-[rgba(0,0,0,0.3)] before:z-home-page-banner-shadow after:absolute after:bottom-0 after:w-full after:h-36 after:bg-gradient-to-b after:from-transparent after:to-[rgba(0,0,0,0.5)] after:z-home-page-banner-shadow">
      <div
        style={{ backgroundImage: `url(${currentItem.coverImageUrl})` }}
        className="absolute object-cover w-full h-banner-home bg-center bg-cover blur-3xl scale-[1000] z-home-page-banner-blurred-layout"
      />
      <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} className="relative z-home-page-banner-images">
        <Slider
          onSwiper={setSwiper}
          onSlideChangeTransitionEnd={setCurrSlideIndex}
          autoplay={{ delay: SLIDE_CHANGE_TIME }}
        >
          {items.map((comic, i) => (
            <Link to={getComicRoute(comic.title)} key={`home-page-banner-${i}`}>
              <div
                style={{ backgroundImage: `url(${comic.coverImageUrl})` }}
                className="object-cover w-full bg-center bg-cover aspect-video"
              />
            </Link>
          ))}
        </Slider>
      </Container>
      <Container
        maxWidth={MUI_CONTAINER_MAX_WIDTH}
        className="absolute bottom-0 pb-10 *:px-12 *:text-white *:line-clamp-1 -translate-x-1/2 left-1/2 z-home-page-banner-caption"
      >
        <Typography variant="h4" title={title} href={getComicRoute(currentItem.title)}>
          {title}
        </Typography>
        <Typography title={description}>{description}</Typography>
      </Container>
      <Pagination items={items} activeIndex={currentSlideIndex} onClick={Swiper?.slideTo} />
    </div>
  );
}

export default HomePageBanner;
