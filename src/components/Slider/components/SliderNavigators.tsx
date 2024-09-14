import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { SwiperClass } from 'swiper/react';

import { Button } from '~/components/index.ts';

export interface SliderNavigatorsProps {
  swiper?: SwiperClass;
}

function SliderNavigators({ swiper }: SliderNavigatorsProps) {
  const isBeginning = swiper?.isBeginning;
  const isEnd = swiper?.isEnd;
  const noSlide = swiper?.slides?.length === 0;
  const notEnoughSlides =
    swiper && swiper.slides && swiper.slides.length <= swiper.slidesPerViewDynamic();

  let className = `absolute top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md cursor-pointer text-gray-600 text-4xl transition-opacity ease-out hidden md:block`;
  if (!className.includes('hidden') && (noSlide || notEnoughSlides)) className += ' hidden';

  const handleClickPrev = () => swiper && swiper.slidePrev();

  const handleClickNext = () => swiper && swiper.slideNext();

  return (
    <>
      <Button
        unstyled
        className={`${className} -left-6 ${isBeginning ? 'opacity-0' : ''}`}
        onClick={handleClickPrev}
      >
        <KeyboardArrowLeft />
      </Button>
      <Button
        unstyled
        className={`${className} -right-6 ${isEnd ? 'opacity-0' : ''}`}
        onClick={handleClickNext}
      >
        <KeyboardArrowRight />
      </Button>
    </>
  );
}

export default SliderNavigators;
