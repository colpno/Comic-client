import { Container } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 } from 'uuid';

import { Tab, Tabs } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { useDeviceWatcher, useScroll } from '~/hooks/index.ts';
import BaseHeader from '~/layouts/components/Header.tsx';
import { cn, heights } from '~/utils/cssUtils.ts';
import { menu, SubMenuItem } from '../menus.ts';

const parseHeight = (height: string): number => parseInt(height, 10);

function MenuLayoutHeader() {
  const notDesktop = useDeviceWatcher() !== 'desktop';

  const headerHeight = useMemo(() => {
    const headersHeight = [
      notDesktop ? parseHeight(heights.header) : parseHeight(heights['header-md']),
      parseHeight(heights['menu-layout-sub-menu']),
      parseHeight(heights['menu-layout-category-menu']),
    ];

    return `${headersHeight.reduce((sum, h) => (sum += h), 0)}px`;
  }, [notDesktop]);

  return (
    <div style={{ height: headerHeight }}>
      <BaseHeader />
      <div className="fixed left-0 right-0 top-header md:top-header-md z-sub-header">
        <Menu />
        <SubMenu />
      </div>
    </div>
  );
}

export default MenuLayoutHeader;

function Menu() {
  const [isHid, setIsHid] = useState(false);

  useScroll(() => (window.scrollY > 100 ? setIsHid(true) : setIsHid(false)));

  if (isHid) return null;

  return (
    <MenuContainer className="h-menu-layout-sub-menu">
      <Tabs
        as="links"
        routes={menu.map((item) => item.link)}
        matchParams
        centered
        sx={tabNavigatorsStyles}
      >
        {menu.map((item) => (
          <Tab label={item.title} value={item.link} className="!text-lg !font-bold" key={v4()} />
        ))}
      </Tabs>
    </MenuContainer>
  );
}

function SubMenu() {
  const { pathname } = useLocation();
  const [menuItems, setMenuItems] = useState<null | SubMenuItem[]>(null);

  useEffect(() => {
    const currMenu = menu.find((item) => item.link.slice(0, pathname.length) === pathname);
    if (currMenu && currMenu.headerMenu) setMenuItems(currMenu.headerMenu);
    else setMenuItems(null);
  }, [pathname]);

  if (!menuItems) return null;

  return (
    <MenuContainer className="h-menu-layout-category-menu">
      <Tabs
        as="links"
        routes={menuItems.map((item) => item.link)}
        centered
        matchParams
        TabIndicatorProps={{ style: { display: 'none' } }}
        sx={{
          '& .Mui-selected': {
            color: 'var(--text-primary)',
            fontWeight: 500,
          },
          '& .MuiTab-root:not(.Mui-selected)': {
            color: 'var(--text-disabled)',
          },
          ...tabNavigatorsStyles,
        }}
      >
        {menuItems.map((item) => (
          <Tab label={item.title} value={item.link} key={v4()} />
        ))}
      </Tabs>
    </MenuContainer>
  );
}

const tabNavigatorsStyles = {
  '& .MuiTabs-scrollButtons svg': {
    fontSize: '1.6em',
  },
  '& .MuiTabs-scrollButtons.Mui-disabled': {
    opacity: 0.3,
  },
};

function MenuContainer({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn('border-b dark:border-gray-800  bg-main', className)}>
      <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} component="nav">
        {children}
      </Container>
    </div>
  );
}
