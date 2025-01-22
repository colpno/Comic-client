import { useState } from 'react';
import { v4 } from 'uuid';

import { Tab, Tabs } from '~/components/index.ts';
import { useScroll } from '~/hooks/index.ts';
import { menu } from '../menus.ts';
import MenuContainer from './MenuLayoutHeaderContainer.tsx';

const tabNavigatorsStyles = {
  '& .MuiTabs-scrollButtons svg': {
    fontSize: '1.6em',
  },
  '& .MuiTabs-scrollButtons.Mui-disabled': {
    opacity: 0.3,
  },
};

function MenuLayoutHeaderMenu() {
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

export default MenuLayoutHeaderMenu;
