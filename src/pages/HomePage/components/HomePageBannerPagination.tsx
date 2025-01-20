import { Container } from '@mui/material';

import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { cn } from '~/utils/cssUtils.ts';
import HomePageBanner from './HomePageBanner.tsx';

interface Props {
  items: React.ComponentProps<typeof HomePageBanner>['items'];
  activeIndex: number;
  /**
   * Fire when click on an item of pagination
   * @param slideIndex start form 0
   */
  onClick?: (slideIndex: number) => void;
}

function HomePageBannerPagination({ items, activeIndex, onClick }: Props) {
  return (
    <Container
      maxWidth={MUI_CONTAINER_MAX_WIDTH}
      className="absolute bottom-0 flex justify-center gap-2 pb-4 z-home-page-banner-pagination"
    >
      {items.map((_, i) => (
        <div
          key={`home-page-banner-pagination-${i}`}
          onClick={() => onClick?.(i)}
          className={cn(
            'w-2 h-2 rounded-full bg-white transition-all ease duration-200 cursor-pointer',
            activeIndex === i ? 'bg-opacity-100 w-6' : 'bg-opacity-50'
          )}
        />
      ))}
    </Container>
  );
}

export default HomePageBannerPagination;
