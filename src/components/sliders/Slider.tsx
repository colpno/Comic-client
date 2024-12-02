import { memo, useCallback, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperClass, SwiperProps, SwiperSlide, SwiperSlideProps } from 'swiper/react';
import { v4 } from 'uuid';

import { Omit } from '~/types/commonTypes.ts';
import { cn } from '~/utils/cssUtils.ts';
import { getModules } from './sliderUtils.ts';

interface Props extends Omit<SwiperProps, 'children' | 'modules'> {
  children: React.ReactNode | React.ReactNode[];
  slideProp?: SwiperSlideProps;
  centerSlideContent?: boolean;
}

function Slider(props: Props) {
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
