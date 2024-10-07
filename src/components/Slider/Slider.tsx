import { Box, BoxProps } from '@mui/material';
import { memo, useCallback, useState } from 'react';
import { Swiper, SwiperClass, SwiperProps, SwiperSlide, SwiperSlideProps } from 'swiper/react';
import { NavigationOptions } from 'swiper/types';
import { twMerge } from 'tailwind-merge';
import { v4 } from 'uuid';

import { Omit } from '~/types/common.ts';
import { SliderNavigatorsProps } from '../ComicSlider/components/SliderNavigators.tsx';
import { getModules } from './helpers/getModules.ts';

export interface SliderProps extends Omit<SwiperProps, 'children' | 'modules' | 'navigation'> {
  children: React.ReactNode | React.ReactNode[];
  slotProps?: SliderNavigatorsProps['slotProps'] & {
    container?: BoxProps;
    slides?: SwiperSlideProps;
  };
  navigation?:
    | boolean
    | ({ custom?: (props: SliderNavigatorsProps) => JSX.Element } & NavigationOptions);
}

function Slider(props: SliderProps) {
  const { children, slotProps, ...swiperProps } = props;
  const [swiper, setSwiper] = useState<SwiperClass>();

  const customizedNavigators =
    typeof props.navigation === 'object' && props.navigation.custom !== undefined
      ? props.navigation.custom({ swiper, slotProps })
      : null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- unused, just for re-rendering navigators when slide change
  const [_slideIndex, setSlideIndex] = useState(0);

  const handleSlideChange = useCallback((swp: SwiperClass) => setSlideIndex(swp.activeIndex), []);

  return (
    <Box
      {...slotProps?.container}
      sx={
        customizedNavigators !== null
          ? {
              ...slotProps?.container?.sx,
              // Hide default navigation buttons
              '& .swiper-button-next, & .swiper-button-prev': {
                display: 'none',
              },
            }
          : slotProps?.container?.sx
      }
      className={twMerge('relative', slotProps?.container?.className)}
    >
      <Swiper
        modules={getModules(props)}
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
      {customizedNavigators}
    </Box>
  );
}

export default memo(Slider);
