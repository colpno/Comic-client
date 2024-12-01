import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { PiBooks } from 'react-icons/pi';
import { Link, Outlet } from 'react-router-dom';

import { Button, Logo, Typography } from '~/components/index.ts';
import { ROUTE_LIBRARY } from '~/constants/routeConstants.ts';
import { useScroll } from '~/hooks/useScroll.ts';
import { heights } from '~/utils/cssUtils.ts';
import Footer from '../components/Footer.tsx';
import BaseHeader from '../components/Header.tsx';
import HeaderAccountButton from '../components/HeaderActions/HeaderAccountButton.tsx';
import { ReadingLayoutContextProvider, ReadingLayoutContextType } from './ReadingLayoutContext.ts';

function Header() {
  return (
    <BaseHeader>
      {({ isMobile, theme }) => (
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
          <nav className="flex items-center gap-2 md:gap-4">
            <Button as="iconButton" color="inherit" title="Go to the previous">
              <FaChevronLeft fontSize={18} />
            </Button>
            <Typography variant="h6">2</Typography>
            <Button as="iconButton" color="inherit" title="Go to the next">
              <FaChevronRight fontSize={18} />
            </Button>
          </nav>
          <nav>
            <Button as="iconButton" href={ROUTE_LIBRARY} color="inherit" title="Library">
              <PiBooks />
            </Button>
            <HeaderAccountButton />
          </nav>
        </>
      )}
    </BaseHeader>
  );
}

function ReadingLayout() {
  const [visibility, setVisibility] = useState(true);

  useScroll(() => setVisibility(!(window.scrollY > parseInt(heights.header))));

  const toggleVisibility = () =>
    window.scrollY > parseInt(heights.header) && setVisibility((prev) => !prev);

  const contextValues: ReadingLayoutContextType = {
    headerVisibility: visibility,
    setHeaderVisibility: setVisibility,
    toggleHeaderVisibility: toggleVisibility,
  };

  return (
    <ReadingLayoutContextProvider value={contextValues}>
      <div className="flex flex-col min-h-dvh">
        {visibility && <Header />}
        <main className="flex-1 pb-16 pt-header md:pt-header-md">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ReadingLayoutContextProvider>
  );
}

export default ReadingLayout;
