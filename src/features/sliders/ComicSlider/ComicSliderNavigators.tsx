import { HTMLAttributes } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { SwiperClass } from 'swiper/react';

import { Button } from '~/components/index.ts';
import { useCustomSliderNavigators } from '~/hooks/index.ts';
import { SliderProps } from '~/types/index.ts';
import { cn } from '~/utils/cssUtils.ts';

interface Props {
  swiper: SwiperClass;
  slotProps?: {
    slide?: SliderProps['slideProp'];
    prevButton?: HTMLAttributes<HTMLButtonElement>;
    nextButton?: HTMLAttributes<HTMLButtonElement>;
  };
}

function ComicSliderNavigators({ swiper, slotProps }: Props) {
  const { isEnd, isBeginning, handleClickPrev, handleClickNext } =
    useCustomSliderNavigators(swiper);

  const noSlide = swiper?.slides?.length === 0;
  const notEnoughSlides =
    swiper && swiper.slides && swiper.slides.length <= swiper.slidesPerViewDynamic();

  let className =
    'absolute flex items-center justify-center min-w-0 p-2 text-4xl text-gray-600 transition-opacity ease-out -translate-y-1/2 rounded-full shadow-lg bg-main top-1/2 z-slider-navigators';
  if (!className.includes('hidden') && (noSlide || notEnoughSlides)) className += ' hidden';

  return (
    <>
      <Button
        as="unstyled"
        {...slotProps?.prevButton}
        className={cn(
          className,
          '-left-6',
          isBeginning && 'hidden',
          slotProps?.prevButton?.className
        )}
        onClick={handleClickPrev}
      >
        <MdKeyboardArrowLeft />
      </Button>
      <Button
        as="unstyled"
        {...slotProps?.nextButton}
        className={cn(className, '-right-6', isEnd && 'hidden', slotProps?.nextButton?.className)}
        onClick={handleClickNext}
      >
        <MdKeyboardArrowRight />
      </Button>
    </>
  );
}

export default ComicSliderNavigators;
