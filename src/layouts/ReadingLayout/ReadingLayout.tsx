import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { GoQuestion } from 'react-icons/go';
import { HiBars3BottomLeft } from 'react-icons/hi2';
import { PiBooks } from 'react-icons/pi';
import { Link, Outlet, useParams } from 'react-router-dom';

import { Button, Logo, Popup, Typography } from '~/components/index.ts';
import { getComicRoute, ROUTE_LIBRARY } from '~/constants/routeConstants.ts';
import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import { cn } from '~/utils/cssUtils.ts';
import Footer from '../components/Footer.tsx';
import BaseHeader from '../components/Header.tsx';
import HeaderAccountButton from '../components/HeaderActions/HeaderAccountButton.tsx';
import {
  ReadingLayoutContextProvider,
  ReadingLayoutContextType,
  useReadingLayoutContext,
} from './ReadingLayoutContext.ts';

interface GuidePopupProps {
  open: boolean;
  onClose: () => void;
}

function GuidePopup({ open, onClose }: GuidePopupProps) {
  return (
    <Popup open={open} title="Reading Guide" onClose={onClose}>
      <table className="[&_th]:border [&_th]:border-black [&_td]:border [&_td]:border-black [&_td]:px-2">
        <tr className="*:text-center">
          <th>Action</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>Click/Touch on chapter's images.</td>
          <td>To toggle header.</td>
        </tr>
      </table>
    </Popup>
  );
}

function Header() {
  const { headerVisibility } = useReadingLayoutContext();
  const isMobile = useDeviceWatcher() === 'mobile';
  const [guidePopup, setGuidePopup] = useState(false);
  const { comicId, chapterNumber } = useParams();
  const comicPageHref = comicId ? getComicRoute(comicId) : undefined;

  const openGuidePopup = () => setGuidePopup(true);
  const closeGuidePopup = () => setGuidePopup(false);

  return (
    <>
      <BaseHeader
        slotProps={{
          container: {
            className: cn(
              'shadow-[0_2px_4px_rgba(0,0,0,0.05)] transition-[opacity] ease-out',
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
              <Button as="iconButton" href={ROUTE_LIBRARY} color="inherit" title="Library">
                <PiBooks />
              </Button>
              <HeaderAccountButton />
            </nav>
          </>
        )}
      </BaseHeader>
      {isMobile && (
        <div
          className={cn(
            'fixed bottom-0 left-0 right-0 flex items-center justify-between bg-main shadow-[0_-2px_4px_rgba(0,0,0,0.1)] z-header transition-[opacity] ease-out',
            !headerVisibility && 'opacity-0'
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
      )}
      <GuidePopup open={guidePopup} onClose={closeGuidePopup} />
    </>
  );
}

function ReadingLayout() {
  const [visibility, setVisibility] = useState(true);

  const toggleVisibility = () => setVisibility((prev) => !prev);

  const contextValues: ReadingLayoutContextType = {
    headerVisibility: visibility,
    setHeaderVisibility: setVisibility,
    toggleHeaderVisibility: toggleVisibility,
  };

  return (
    <ReadingLayoutContextProvider value={contextValues}>
      <div className="flex flex-col min-h-dvh">
        <Header />
        <main className="flex-1 pb-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ReadingLayoutContextProvider>
  );
}

export default ReadingLayout;
