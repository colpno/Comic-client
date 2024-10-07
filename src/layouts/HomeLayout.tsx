import { useTheme } from '@mui/material';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Logo } from '~/components/index.ts';
import { useDeviceWatcher, useScroll } from '~/hooks/index.ts';
import DefaultHeader from './components/Header.tsx';
import HeaderActions from './components/HeaderActions.tsx';

function Header() {
  const isMobile = useDeviceWatcher() === 'mobile';
  const theme = useTheme();
  const [activeHeader, setActiveHeader] = useState(false); // true if the user has scrolled down
  const logoColor = activeHeader ? theme.palette.primary.main : '#fff';

  useScroll(() => setActiveHeader(window.scrollY > 100));

  return (
    <DefaultHeader
      slotProps={{
        container: {
          className: activeHeader ? '' : 'bg-transparent',
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
    </DefaultHeader>
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
