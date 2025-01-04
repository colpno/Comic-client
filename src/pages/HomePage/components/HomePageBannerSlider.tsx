import { Container } from '@mui/material';
import { useState } from 'react';
import { SwiperClass } from 'swiper/react';
import { Swiper } from 'swiper/types';

import { Slider, Typography } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { Comic } from '~/types/comicType.ts';
import { cn } from '~/utils/cssUtils.ts';

interface Props {
  items: Comic[];
}

function HomePageBannerSlider({ items }: Props) {
  const [Swiper, setSwiper] = useState<null | SwiperClass>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const AUTOPLAY_DELAY = 10000; // 10s

  const setCurrSlideIndex = (swiper: Swiper) => setCurrentSlideIndex(swiper.activeIndex);

  return (
    <div className="relative overflow-hidden h-banner-home flex flex-col items-center justify-center before:absolute before:top-0 before:w-full before:h-24 before:bg-gradient-to-t before:from-transparent before:to-[rgba(0,0,0,0.3)] before:z-home-page-banner-shadow after:absolute after:bottom-0 after:w-full after:h-36 after:bg-gradient-to-b after:from-transparent after:to-[rgba(0,0,0,0.5)] after:z-home-page-banner-shadow">
      <div
        style={{ backgroundImage: `url(${items[currentSlideIndex].coverImageUrl})` }}
        className="absolute object-cover w-full h-banner-home bg-center bg-cover blur-3xl scale-[1000] z-home-page-banner-blurred-layout"
      />
      <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} className="relative z-home-page-banner-images">
        <Slider
          onSwiper={setSwiper}
          onSlideChangeTransitionEnd={setCurrSlideIndex}
          autoplay={{ delay: AUTOPLAY_DELAY }}
        >
          {items.map((comic, i) => (
            <div
              key={`home-page-banner-${i}`}
              style={{ backgroundImage: `url(${comic.coverImageUrl})` }}
              className="object-cover w-full bg-center bg-cover aspect-video"
            />
          ))}
        </Slider>
      </Container>
      <Container
        maxWidth={MUI_CONTAINER_MAX_WIDTH}
        className="absolute bottom-0 pb-10 *:px-12 *:text-white *:line-clamp-1 -translate-x-1/2 left-1/2 z-home-page-banner-caption"
      >
        <Typography variant="h4">{items[currentSlideIndex].title}</Typography>
        <Typography>{items[currentSlideIndex].description}</Typography>
      </Container>
      <Container
        maxWidth={MUI_CONTAINER_MAX_WIDTH}
        className="absolute bottom-0 flex justify-center gap-2 pb-4 z-home-page-banner-pagination"
      >
        {items.map((_, i) => (
          <div
            key={`home-page-banner-pagination-${i}`}
            onClick={() => Swiper?.slideTo(i)}
            className={cn(
              'w-2 h-2 rounded-full bg-white transition-all ease duration-200 cursor-pointer',
              currentSlideIndex === i ? 'bg-opacity-100 w-6' : 'bg-opacity-50'
            )}
          />
        ))}
      </Container>
    </div>
  );
}

export default HomePageBannerSlider;
