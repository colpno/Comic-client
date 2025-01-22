import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 } from 'uuid';

import { Tab, Tabs } from '~/components/index.ts';
import { menu, SubMenuItem } from '../menus.ts';
import MenuContainer from './MenuLayoutHeaderContainer.tsx';

const tabNavigatorsStyles = {
  '& .MuiTabs-scrollButtons svg': {
    fontSize: '1.6em',
  },
  '& .MuiTabs-scrollButtons.Mui-disabled': {
    opacity: 0.3,
  },
};

function MenuLayoutHeaderSubMenu() {
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

export default MenuLayoutHeaderSubMenu;
