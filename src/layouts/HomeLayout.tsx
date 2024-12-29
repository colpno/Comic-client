import { useTheme } from '@mui/material';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Logo } from '~/components/index.ts';
import { useDeviceWatcher, useScroll } from '~/hooks/index.ts';
import Footer from './components/Footer.tsx';
import BaseHeader from './components/Header.tsx';
import HeaderActions from './components/HeaderActions/HeaderActions.tsx';

function Header() {
  const isMobile = useDeviceWatcher() === 'mobile';
  const theme = useTheme();
  const [activeHeader, setActiveHeader] = useState(false); // true if the user has scrolled down
  const logoColor = activeHeader ? theme.palette.primary.main : '#fff';

  useScroll(() => setActiveHeader(window.scrollY > 0));

  return (
    <BaseHeader
      slotProps={{
        header: {
          className: activeHeader ? 'text-main' : 'text-white bg-transparent border-b-0',
        },
      }}
    >
      <Link to="/">
        {isMobile ? (
          <Logo variant="small" fill={logoColor} />
        ) : (
          <Logo width={110} height={27} fill={logoColor} />
        )}
      </Link>
      <HeaderActions />
    </BaseHeader>
  );
}

function HomeLayout() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default HomeLayout;
