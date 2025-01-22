import { Link, useNavigate } from 'react-router-dom';

import { Logo as AppLogo } from '~/components/index.ts';
import { useDeviceWatcher } from '~/hooks/index.ts';
import BaseHeader from '~/layouts/components/Header.tsx';
import { cn } from '~/utils/cssUtils.ts';
import { useReadingLayoutContext } from '../ReadingLayoutContext.ts';
import BottomBar from './ReadingLayoutBottomBar.tsx';
import Actions from './ReadingLayoutHeaderActions.tsx';
import ComicTitle from './ReadingLayoutHeaderComicTitle.tsx';
import Navigation from './ReadingLayoutHeaderNavigation';

function ReadingLayoutHeader() {
  const navigate = useNavigate();
  const { headerVisibility, pagination, comic, chapter } = useReadingLayoutContext();
  const isMobile = useDeviceWatcher() === 'mobile';

  const handlePrevClick = () => {
    const { previous } = pagination;

    if (previous) {
      navigate(previous);
    }
  };

  const handleNextClick = () => {
    const { next } = pagination;

    if (next) {
      navigate(next);
    }
  };

  return (
    <>
      <BaseHeader
        slotProps={{
          header: {
            className: cn(
              'shadow-[0_2px_4px_rgba(0,0,0,0.05)] sm:shadow-none transition-[opacity] ease-out',
              !headerVisibility && 'hidden'
            ),
          },
        }}
      >
        {({ theme }) => (
          <>
            <nav className="flex items-center justify-center gap-3">
              <Link to="/">
                {isMobile ? (
                  <AppLogo variant="small" fill={theme.palette.primary.main} />
                ) : (
                  <AppLogo width={110} height={27} fill={theme.palette.primary.main} />
                )}
              </Link>
              {comic && <ComicTitle text={comic.title} />}
            </nav>
            {!isMobile && chapter?.chapter && (
              <Navigation
                onNextClick={handleNextClick}
                onPrevClick={handlePrevClick}
                chapter={chapter.chapter}
              />
            )}
            <Actions />
          </>
        )}
      </BaseHeader>
      {isMobile && <BottomBar isDisplay={headerVisibility} />}
    </>
  );
}

export default ReadingLayoutHeader;
