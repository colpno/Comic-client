import { Autoplay, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { SwiperProps } from 'swiper/react';
import { SwiperModule } from 'swiper/types';

export const getModules = (options: SwiperProps) => {
  const modules: SwiperModule[] = [];

  if (options.pagination) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    import('swiper/css/pagination');
    modules.push(Pagination);
  }

  if (options.navigation) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    import('swiper/css/navigation');
    modules.push(Navigation);
  }

  if (options.mousewheel) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    import('swiper/css/mousewheel');
    modules.push(Mousewheel);
  }

  if (options.keyboard) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    import('swiper/css/keyboard');
    modules.push(Keyboard);
  }

  if (options.scrollbar) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    import('swiper/css/scrollbar');
    modules.push(Scrollbar);
  }

  if (options.autoplay) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    import('swiper/css/autoplay');
    modules.push(Autoplay);
  }

  return modules;
};
