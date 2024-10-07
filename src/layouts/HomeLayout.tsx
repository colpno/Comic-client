import { Container, useTheme } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { Logo } from '~/components/index.ts';
import { useDeviceWatcher, useScroll } from '~/hooks/index.ts';
import HeaderActions from './components/HeaderActions.tsx';

function Header() {
  const theme = useTheme();
  const isMobile = useDeviceWatcher() === 'mobile';
  const [activeHeader, setActiveHeader] = useState(false); // true if the user has scrolled down
  const logoColor = activeHeader ? theme.palette.primary.main : '#fff';

  useScroll(() => setActiveHeader(window.scrollY > 100));

  return (
    <header
      id="header"
      className={twMerge(
        'fixed top-0 left-0 right-0 z-header',
        activeHeader ? 'bg-white shadow-md' : 'bg-transparent'
      )}
    >
      <Container maxWidth="md" className="flex items-center justify-between">
        {isMobile ? (
          <Logo variant="small" fill={logoColor} />
        ) : (
          <Logo width={110} height={27} fill={logoColor} />
        )}
        <HeaderActions />
      </Container>
    </header>
  );
}

function HomeLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <footer
        id="footer"
        className="flex flex-col items-center justify-center py-10 bg-secondary text-[#868e96] text-sm"
      >
        © Comic Corporation. All rights reserved.
      </footer>
    </>
  );
}

export default HomeLayout;
