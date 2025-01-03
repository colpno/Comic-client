import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { GoQuestion } from 'react-icons/go';
import { HiBars3BottomLeft } from 'react-icons/hi2';
import { PiBooks } from 'react-icons/pi';
import { Link, useParams } from 'react-router-dom';

import { Button, Logo, Typography } from '~/components/index.ts';
import { getComicRoute, ROUTE_HISTORY } from '~/constants/routeConstants.ts';
import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import BaseHeader from '~/layouts/components/Header.tsx';
import HeaderAccountButton from '~/layouts/components/HeaderActions/HeaderAccountButton.tsx';
import { cn } from '~/utils/cssUtils.ts';
import { useReadingLayoutContext } from '../ReadingLayoutContext.ts';
import ReadingLayoutGuidePopup from './ReadingLayoutGuidePopup.tsx';

interface BottomBarProps {
  isDisplay: boolean;
}

function BottomBar({ isDisplay }: BottomBarProps) {
  const { comicTitle, chapterNumber } = useParams();
  const comicPageHref = comicTitle ? getComicRoute(comicTitle) : undefined;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 flex items-center justify-between bg-main shadow-[0_-2px_4px_rgba(0,0,0,0.1)] z-header transition-[opacity] ease-out',
        !isDisplay && 'opacity-0'
      )}
    >
      <nav>
        <Button
          as="iconButton"
          href={comicPageHref}
          color="inherit"
          title="Go back to the comic page"
        >
          <HiBars3BottomLeft />
        </Button>
      </nav>
      <div className="flex-1 pl-2 pr-4 line-clamp-1">
        <Typography>Ch.{chapterNumber}</Typography>
      </div>
      <nav className="flex items-center gap-2 md:gap-4">
        <Button as="iconButton" color="inherit" title="Go to the previous">
          <FaChevronLeft fontSize={18} />
        </Button>
        <Button as="iconButton" color="inherit" title="Go to the next">
          <FaChevronRight fontSize={18} />
        </Button>
      </nav>
    </div>
  );
}

function ReadingLayoutHeader() {
  const { headerVisibility } = useReadingLayoutContext();
  const isMobile = useDeviceWatcher() === 'mobile';
  const [guidePopup, setGuidePopup] = useState(false);

  const openGuidePopup = () => setGuidePopup(true);

  const closeGuidePopup = () => setGuidePopup(false);

  return (
    <>
      <BaseHeader
        slotProps={{
          header: {
            className: cn(
              'shadow-[0_2px_4px_rgba(0,0,0,0.05)] sm:shadow-none transition-[opacity] ease-out',
              !headerVisibility && 'opacity-0'
            ),
          },
        }}
      >
        {({ theme }) => (
          <>
            <nav>
              <Link to="/">
                {isMobile ? (
                  <Logo variant="small" fill={theme.palette.primary.main} />
                ) : (
                  <Logo width={110} height={27} fill={theme.palette.primary.main} />
                )}
              </Link>
            </nav>
            {!isMobile && (
              <nav className="flex items-center gap-2 md:gap-4">
                <Button as="iconButton" color="inherit" title="Go to the previous page">
                  <FaChevronLeft fontSize={18} />
                </Button>
                <Typography variant="h6">2</Typography>
                <Button as="iconButton" color="inherit" title="Go to the next page">
                  <FaChevronRight fontSize={18} />
                </Button>
              </nav>
            )}
            <nav>
              <Button
                as="iconButton"
                color="inherit"
                title="Reading guide"
                onClick={openGuidePopup}
              >
                <GoQuestion />
              </Button>
              <Button as="iconButton" href={ROUTE_HISTORY} color="inherit" title="History">
                <PiBooks />
              </Button>
              <HeaderAccountButton />
            </nav>
          </>
        )}
      </BaseHeader>
      {isMobile && <BottomBar isDisplay={headerVisibility} />}
      <ReadingLayoutGuidePopup open={guidePopup} onClose={closeGuidePopup} />
    </>
  );
}

export default ReadingLayoutHeader;
