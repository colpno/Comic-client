import { memo, useCallback, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperProps, SwiperSlide, SwiperSlideProps } from 'swiper/react';
import { SwiperModule } from 'swiper/types';
import { v4 } from 'uuid';

import { Omit } from '~/types/commonTypes.ts';

const getModules = (options: SwiperProps) => {
  const modules: SwiperModule[] = [];

  if (options.pagination) modules.push(Pagination);
  if (options.navigation) modules.push(Navigation);
  if (options.mousewheel) modules.push(Mousewheel);
  if (options.keyboard) modules.push(Keyboard);

  return modules;
};

interface Props extends Omit<SwiperProps, 'children' | 'modules'> {
  children: React.ReactNode | React.ReactNode[];
  slideProp?: SwiperSlideProps;
}

function Slider(props: Props) {
  const { children, slideProp, ...swiperProps } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- unused, just for re-rendering navigators when slide change
  const [_slideIndex, setSlideIndex] = useState(0);

  const handleSlideChange = useCallback((swp: SwiperClass) => setSlideIndex(swp.activeIndex), []);

  return (
    <Swiper modules={getModules(props)} {...swiperProps} onSlideChange={handleSlideChange}>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <SwiperSlide {...slideProp} key={`slide-${v4()}-${index}`}>
            {child}
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide {...slideProp}>{children}</SwiperSlide>
      )}
    </Swiper>
  );
}

export default memo(Slider);
