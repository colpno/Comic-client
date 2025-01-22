import { memo, useCallback, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { v4 } from 'uuid';

import { SliderProps } from '~/types/index.ts';
import { cn } from '~/utils/cssUtils.ts';
import { getModules } from './sliderUtils.ts';

function Slider(props: SliderProps) {
  const { children, slideProp, centerSlideContent, className, ...swiperProps } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- unused, just for re-rendering navigators when slide change
  const [_slideIndex, setSlideIndex] = useState(0);

  const handleSlideChange = useCallback((swp: SwiperClass) => setSlideIndex(swp.activeIndex), []);

  return (
    <Swiper
      modules={getModules(swiperProps)}
      {...swiperProps}
      onSlideChange={handleSlideChange}
      className={cn(swiperProps.scrollbar && 'pb-4', className)}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <SwiperSlide
              {...slideProp}
              className={cn(
                centerSlideContent && 'flex items-center justify-center',
                slideProp?.className
              )}
              key={`slide-${v4()}-${index}`}
            >
              {child}
            </SwiperSlide>
          ))
        : children}
    </Swiper>
  );
}

export default memo(Slider);
export type { SliderProps };
