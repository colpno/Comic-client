import { useEffect, useState } from 'react';
import { SwiperClass } from 'swiper/react';

export const useCustomSliderNavigators = (swiper: SwiperClass) => {
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

  const handleClickPrev = () => swiper && swiper.slidePrev();

  const handleClickNext = () => swiper && swiper.slideNext();

  return { isEnd, isBeginning, handleClickPrev, handleClickNext };
};
