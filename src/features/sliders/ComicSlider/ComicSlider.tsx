import { Box } from '@mui/material';
import { memo, useState } from 'react';
import { SwiperClass } from 'swiper/react';

import { Slider } from '~/components/index.ts';
import { useDeviceWatcher } from '~/hooks/index.ts';
import { SliderProps } from '~/types/index.ts';
import Navigators from './ComicSliderNavigators.tsx';

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
