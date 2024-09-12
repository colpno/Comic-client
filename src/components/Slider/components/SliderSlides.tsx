import { useId } from 'react';
import { SwiperSlide, SwiperSlideProps } from 'swiper/react';

function SliderSlides({ children, ...props }: SwiperSlideProps) {
  const id = useId();

  if (Array.isArray(children)) {
    return children.map((child, index) => (
      <SwiperSlide {...props} key={`slide-${id}-${index}`}>
        {child}
      </SwiperSlide>
    ));
  }

  return <SwiperSlide {...props}>{children}</SwiperSlide>;
}

export default SliderSlides;
