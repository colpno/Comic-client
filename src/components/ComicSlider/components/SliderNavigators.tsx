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
    'absolute z-10 flex items-center justify-center min-w-0 p-2 text-4xl text-gray-600 transition-opacity ease-out -translate-y-1/2 rounded-full shadow-md bg-primary top-1/2';
  if (!className.includes('hidden') && (noSlide || notEnoughSlides)) className += ' hidden';

  const handleClickPrev = () => swiper && swiper.slidePrev();

  const handleClickNext = () => swiper && swiper.slideNext();

  return (
    <>
      <Button
        as="unstyled"
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
        as="unstyled"
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
