import { SwiperSlide, SwiperSlideProps } from 'swiper/react';
import { v4 } from 'uuid';

function SliderSlides({ children, ...props }: SwiperSlideProps) {
  if (Array.isArray(children)) {
    return children.map((child, index) => (
      <SwiperSlide {...props} key={`slide-${v4()}-${index}`}>
        {child}
      </SwiperSlide>
    ));
  }

  return <SwiperSlide {...props}>{children}</SwiperSlide>;
}

export default SliderSlides;
