import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box } from '@mui/material';
import { ComponentProps, HTMLAttributes, memo, useEffect, useState } from 'react';
import { SwiperClass } from 'swiper/react';

import { Button } from '~/components/index.ts';
import { cn } from '~/utils/cssUtils.ts';
import Slider from './Slider.tsx';

interface NavigatorsProps {
  swiper?: SwiperClass;
  slotProps?: {
    slide?: ComponentProps<typeof Slider>['slideProp'];
    prevButton?: HTMLAttributes<HTMLButtonElement>;
    nextButton?: HTMLAttributes<HTMLButtonElement>;
  };
}

function Navigators({ swiper, slotProps }: NavigatorsProps) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (!swiper) return;

    const updateNavigationState = () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    };

    swiper.on('slideChange', updateNavigationState);

    updateNavigationState();

    return () => {
      swiper.off('slideChange', updateNavigationState);
    };
  }, [swiper]);

  const noSlide = swiper?.slides?.length === 0;
  const notEnoughSlides =
    swiper && swiper.slides && swiper.slides.length <= swiper.slidesPerViewDynamic();

  let className =
    'absolute z-10 flex items-center justify-center min-w-0 p-2 text-4xl text-gray-600 transition-opacity ease-out -translate-y-1/2 rounded-full shadow-lg bg-primary top-1/2 z-slider-navigators';
  if (!className.includes('hidden') && (noSlide || notEnoughSlides)) className += ' hidden';

  const handleClickPrev = () => swiper && swiper.slidePrev();

  const handleClickNext = () => swiper && swiper.slideNext();

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
        <KeyboardArrowLeft />
      </Button>
      <Button
        as="unstyled"
        {...slotProps?.nextButton}
        className={cn(className, '-right-6', isEnd && 'hidden', slotProps?.nextButton?.className)}
        onClick={handleClickNext}
      >
        <KeyboardArrowRight />
      </Button>
    </>
  );
}

function ComicSlider(props: ComponentProps<typeof Slider>) {
  const [swiper, setSwiper] = useState<SwiperClass>();

  return (
    <Box
      className="relative"
      sx={{
        // Hide default navigation buttons
        '& .swiper-button-next, & .swiper-button-prev': {
          display: 'none',
        },
      }}
    >
      <Slider {...props} onSwiper={setSwiper} navigation />
      <Navigators swiper={swiper} />
    </Box>
  );
}

export default memo(ComicSlider);
