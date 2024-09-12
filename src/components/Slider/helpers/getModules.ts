import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { SwiperProps } from 'swiper/react';
import { SwiperModule } from 'swiper/types';

export const getModules = (options: SwiperProps) => {
  const modules: SwiperModule[] = [];

  if (options.pagination) modules.push(Pagination);

  if (options.navigation) modules.push(Navigation);

  if (options.mousewheel) modules.push(Mousewheel);

  if (options.keyboard) modules.push(Keyboard);

  return modules;
};
