import { Box } from '@mui/material';
import { HTMLAttributes, memo, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { SwiperClass } from 'swiper/react';

import { Button, Slider } from '~/components/index.ts';
import { useCustomSliderNavigators, useDeviceWatcher } from '~/hooks/index.ts';
import { SliderProps } from '~/types/index.ts';
import { cn } from '~/utils/cssUtils.ts';

interface NavigatorsProps {
  swiper: SwiperClass;
  slotProps?: {
    slide?: SliderProps['slideProp'];
    prevButton?: HTMLAttributes<HTMLButtonElement>;
    nextButton?: HTMLAttributes<HTMLButtonElement>;
  };
}

function Navigators({ swiper, slotProps }: NavigatorsProps) {
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

function ComicSlider(props: SliderProps) {
  const [swiper, setSwiper] = useState<SwiperClass>();
  const device = useDeviceWatcher();
  const isTabletAndMobile = device === 'tablet' || device === 'mobile';

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
      <Slider {...props} onSwiper={setSwiper} navigation={!isTabletAndMobile} />
      {!isTabletAndMobile && swiper && <Navigators swiper={swiper} />}
    </Box>
  );
}

export default memo(ComicSlider);
