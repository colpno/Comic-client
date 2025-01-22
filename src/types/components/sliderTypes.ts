import { SwiperProps, SwiperSlideProps } from 'swiper/react';

export interface SliderProps extends Omit<SwiperProps, 'children' | 'modules'> {
  children: React.ReactNode | React.ReactNode[];
  slideProp?: SwiperSlideProps;
  centerSlideContent?: boolean;
}
