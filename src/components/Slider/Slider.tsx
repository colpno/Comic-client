import { Box } from '@mui/material';
import { memo, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperClass, SwiperProps, SwiperSlideProps } from 'swiper/react';
import { SwiperModule } from 'swiper/types';

import { Omit } from '~/types/common.ts';
import SliderNavigators from './components/SliderNavigators.tsx';
import SliderSlides from './components/SliderSlides.tsx';
import { getModules } from './helpers/getModules.ts';

export interface SliderProps extends Omit<SwiperProps, 'modules'> {
  slidesProps?: Omit<SwiperSlideProps, 'children'>;
}

function Slider(props: SliderProps) {
  const { children, slidesProps, ...swiperProps } = props;
  const [swiper, setSwiper] = useState<SwiperClass>();
  const modules: SwiperModule[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- unused, just for re-rendering navigators when slide change
  const [_slideIndex, setSlideIndex] = useState(0);

  modules.concat(getModules(props));

  const handleSlideChange = (swp: SwiperClass) => setSlideIndex(swp.activeIndex);

  return (
    <Box
      sx={{
        // Hide default navigation buttons
        '& .swiper-button-next, & .swiper-button-prev': {
          display: 'none',
        },
      }}
      className="relative"
    >
      <Swiper
        modules={modules}
        {...swiperProps}
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
      >
        <SliderSlides {...slidesProps}>{children}</SliderSlides>
      </Swiper>
      <SliderNavigators swiper={swiper} />
    </Box>
  );
}

export default memo(Slider);
