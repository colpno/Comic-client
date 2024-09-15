import { Box, BoxProps } from '@mui/material';
import { memo, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperClass, SwiperProps, SwiperSlide, SwiperSlideProps } from 'swiper/react';
import { SwiperModule } from 'swiper/types';
import { twMerge } from 'tailwind-merge';
import { v4 } from 'uuid';

import { Omit } from '~/types/common.ts';
import SliderNavigators, { SliderNavigatorsProps } from './components/SliderNavigators.tsx';
import { getModules } from './helpers/getModules.ts';

export interface SliderProps extends Omit<SwiperProps, 'modules'> {
  slotProps?: SliderNavigatorsProps['slotProps'] & {
    container?: BoxProps;
    slides?: SwiperSlideProps;
  };
}

function Slider(props: SliderProps) {
  const { children, slotProps, ...swiperProps } = props;
  const [swiper, setSwiper] = useState<SwiperClass>();
  const modules: SwiperModule[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- unused, just for re-rendering navigators when slide change
  const [_slideIndex, setSlideIndex] = useState(0);

  modules.concat(getModules(props));

  const handleSlideChange = (swp: SwiperClass) => setSlideIndex(swp.activeIndex);

  return (
    <Box
      {...slotProps?.container}
      sx={{
        ...slotProps?.container?.sx,
        // Hide default navigation buttons
        '& .swiper-button-next, & .swiper-button-prev': {
          display: 'none',
        },
      }}
      className={twMerge('relative', slotProps?.container?.className)}
    >
      <Swiper
        modules={modules}
        {...swiperProps}
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
      >
        {Array.isArray(children) ? (
          children.map((child, index) => (
            <SwiperSlide {...slotProps?.slides} key={`slide-${v4()}-${index}`}>
              {child}
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide {...slotProps?.slides}>{children}</SwiperSlide>
        )}
      </Swiper>
      {props.navigation ? <SliderNavigators slotProps={slotProps} swiper={swiper} /> : null}
    </Box>
  );
}

export default memo(Slider);
