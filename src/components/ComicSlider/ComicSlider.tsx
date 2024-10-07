import { memo } from 'react';

import Slider, { SliderProps } from '../Slider/Slider.tsx';
import SliderNavigators from './components/SliderNavigators.tsx';

function ComicSlider(props: SliderProps) {
  return (
    <Slider
      {...props}
      navigation={{
        custom: ({ swiper, slotProps }) => (
          <SliderNavigators slotProps={slotProps} swiper={swiper} />
        ),
      }}
    />
  );
}

export default memo(ComicSlider);
