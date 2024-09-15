import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { HTMLAttributes } from 'react';
import { SwiperClass } from 'swiper/react';
import { twMerge } from 'tailwind-merge';

import { Button } from '~/components/index.ts';

export interface SliderNavigatorsProps {
  swiper?: SwiperClass;
  slotProps?: {
    prevButton?: HTMLAttributes<HTMLButtonElement>;
    nextButton?: HTMLAttributes<HTMLButtonElement>;
  };
}

function SliderNavigators({ swiper, slotProps }: SliderNavigatorsProps) {
  const isBeginning = swiper?.isBeginning;
  const isEnd = swiper?.isEnd;
  const noSlide = swiper?.slides?.length === 0;
  const notEnoughSlides =
    swiper && swiper.slides && swiper.slides.length <= swiper.slidesPerViewDynamic();

  let className =
    '!absolute top-1/2 -translate-y-1/2 z-10 !bg-white !min-w-0 !rounded-full !p-2 shadow-md text-gray-600 text-4xl transition-opacity ease-out flex items-center justify-center';
  if (!className.includes('hidden') && (noSlide || notEnoughSlides)) className += ' hidden';

  const handleClickPrev = () => swiper && swiper.slidePrev();

  const handleClickNext = () => swiper && swiper.slideNext();

  return (
    <>
      <Button
        {...slotProps?.prevButton}
        className={twMerge(
          className,
          '-left-6',
          isBeginning && 'opacity-0',
          slotProps?.prevButton?.className
        )}
        onClick={handleClickPrev}
      >
        <KeyboardArrowLeft />
      </Button>
      <Button
        {...slotProps?.prevButton}
        disableGutter
        className={twMerge(
          className,
          '-right-6',
          isEnd && 'opacity-0',
          slotProps?.nextButton?.className
        )}
        onClick={handleClickNext}
      >
        <KeyboardArrowRight />
      </Button>
    </>
  );
}

export default SliderNavigators;
