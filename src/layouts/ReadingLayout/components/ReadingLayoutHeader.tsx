import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { GoQuestion } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Logo, Typography } from '~/components/index.ts';
import { getComicRoute } from '~/constants/routeConstants.ts';
import { useDeviceWatcher } from '~/hooks/index.ts';
import BaseHeader from '~/layouts/components/Header.tsx';
import AccountButton from '~/layouts/components/HeaderActions/HeaderAccountButton.tsx';
import BookshelfButton from '~/layouts/components/HeaderActions/HeaderBookshelfButton.tsx';
import ThemeButton from '~/layouts/components/HeaderActions/HeaderThemeButton.tsx';
import { cn } from '~/utils/cssUtils.ts';
import { useReadingLayoutContext } from '../ReadingLayoutContext.ts';
import BottomBar from './ReadingLayoutBottomBar.tsx';
import Guide from './ReadingLayoutGuidePopup.tsx';

function ReadingLayoutHeader() {
  const navigate = useNavigate();
  const { headerVisibility, pagination, comic, chapter } = useReadingLayoutContext();
  const isMobile = useDeviceWatcher() === 'mobile';
  const [guidePopup, setGuidePopup] = useState(false);

  const openGuidePopup = () => setGuidePopup(true);
  const closeGuidePopup = () => setGuidePopup(false);

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
                  <Logo variant="small" fill={theme.palette.primary.main} />
                ) : (
                  <Logo width={110} height={27} fill={theme.palette.primary.main} />
                )}
              </Link>
              {comic && (
                <div className="line-clamp-1 w-[100px] md:w-[180px] lg:w-[200px]">
                  <Typography
                    href={getComicRoute(comic.title)}
                    title={comic.title}
                    fontWeight={600}
                  >
                    {comic.title}
                  </Typography>
                </div>
              )}
            </nav>
            {!isMobile && chapter && (
              <nav className="absolute flex items-center gap-2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:gap-4">
                <Button as="iconButton" color="inherit" onClick={handlePrevClick}>
                  <FaChevronLeft fontSize={18} />
                </Button>
                <Typography variant="h6">{chapter.chapter}</Typography>
                <Button as="iconButton" color="inherit" onClick={handleNextClick}>
                  <FaChevronRight fontSize={18} />
                </Button>
              </nav>
            )}
            <nav className="flex items-center">
              <Button
                as="iconButton"
                color="inherit"
                title="Reading guide"
                onClick={openGuidePopup}
              >
                <GoQuestion />
              </Button>
              <BookshelfButton />
              <ThemeButton />
              <AccountButton />
            </nav>
          </>
        )}
      </BaseHeader>
      {isMobile && <BottomBar isDisplay={headerVisibility} />}
      <Guide open={guidePopup} onClose={closeGuidePopup} />
    </>
  );
}

export default ReadingLayoutHeader;
