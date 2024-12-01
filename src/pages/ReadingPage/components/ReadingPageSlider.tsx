import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { SwiperClass } from 'swiper/react';

import { Button, Slider } from '~/components/index.ts';
import { useCustomSliderNavigators, useDeviceWatcher } from '~/hooks/index.ts';
import { cn } from '~/utils/cssUtils.ts';

interface NavigatorsProps {
  swiper: SwiperClass;
}

function Navigators({ swiper }: NavigatorsProps) {
  const { isEnd, isBeginning, handleClickPrev, handleClickNext } =
    useCustomSliderNavigators(swiper);
  const buttonsClasses =
    'absolute -translate-y-1/2 top-1/2 z-slider-navigators flex items-center justify-center min-w-0 p-2 text-3xl';

  return (
    <div>
      <Button
        as="unstyled"
        onClick={handleClickPrev}
        className={cn(buttonsClasses, 'left-2', isBeginning && 'hidden')}
      >
        <FaChevronLeft fontSize="inherit" />
      </Button>
      <Button
        as="unstyled"
        onClick={handleClickNext}
        className={cn(buttonsClasses, 'right-2', isEnd && 'hidden')}
      >
        <FaChevronRight fontSize="inherit" />
      </Button>
    </div>
  );
}

interface Props {
  children: React.ComponentProps<typeof Slider>['children'];
}

function ReadingPageSlider({ children }: Props) {
  const [swiper, setSwiper] = useState<SwiperClass>();
  const notMobile = useDeviceWatcher() !== 'mobile';

  return (
    <div className="relative px-2 md:px-14">
      <Slider
        onSwiper={setSwiper}
        centeredSlides
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerGroup: 1, slidesPerView: 3 },
          600: { slidesPerGroup: 1, slidesPerView: 5 },
          900: { slidesPerGroup: 9, slidesPerView: 9 },
        }}
      >
        {children}
      </Slider>
      {swiper && notMobile && <Navigators swiper={swiper} />}
    </div>
  );
}

export default ReadingPageSlider;
